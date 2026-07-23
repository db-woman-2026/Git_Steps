import { execFileSync, spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const commandEnvironment = {
  ...process.env,
  GIT_MERGE_AUTOEDIT: "no",
  GIT_TERMINAL_PROMPT: "0",
};

function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    env: commandEnvironment,
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function git(cwd, ...args) {
  return run("git", args, cwd);
}

function expectedGitFailure(cwd, ...args) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    env: commandEnvironment,
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status === 0) {
    throw new Error(`Expected git ${args.join(" ")} to fail`);
  }
  return `${result.stdout}\n${result.stderr}`;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(cwd, relativePath) {
  return readFileSync(join(cwd, relativePath), "utf8");
}

function write(cwd, relativePath, content) {
  writeFileSync(join(cwd, relativePath), content, "utf8");
}

function replace(cwd, relativePath, before, after) {
  const original = read(cwd, relativePath);
  assert(original.includes(before), `${relativePath} is missing expected text`);
  write(cwd, relativePath, original.replace(before, after));
}

function append(cwd, relativePath, line) {
  write(cwd, relativePath, `${read(cwd, relativePath).trimEnd()}\n${line}\n`);
}

function assertClean(cwd) {
  assert(git(cwd, "status", "--porcelain") === "", "Working tree is not clean");
}

function commit(cwd, paths, message) {
  git(cwd, "add", "--", ...paths);
  assert(git(cwd, "diff", "--staged", "--stat").length > 0, `No staged change for ${message}`);
  git(cwd, "commit", "-m", message);
  assert(git(cwd, "log", "-1", "--format=%s") === message, `Missing commit: ${message}`);
  assertClean(cwd);
}

function runTaskApp(cwd) {
  return run("node", [join("practice", "task-app", "index.mjs")], cwd);
}

const repositoryRoot = run("git", ["rev-parse", "--show-toplevel"], process.cwd());
const sandboxRoot = mkdtempSync(join(tmpdir(), "git-lecture-"));
const studentRepository = join(sandboxRoot, "student");
const remoteRepository = join(sandboxRoot, "student-remote.git");

try {
  for (let step = 0; step <= 14; step += 1) {
    assert(
      existsSync(join(repositoryRoot, "docs", "lecture", `step-${step}.md`)),
      `Missing main document: step-${step}.md`,
    );
  }

  mkdirSync(studentRepository);
  for (const entry of [".gitignore", "README.md", "practice"]) {
    cpSync(join(repositoryRoot, entry), join(studentRepository, entry), {
      recursive: true,
    });
  }

  git(studentRepository, "init", "-b", "main");
  git(studentRepository, "config", "user.name", "Lecture Verifier");
  git(studentRepository, "config", "user.email", "lecture@example.com");
  git(studentRepository, "add", ".");
  git(studentRepository, "commit", "-m", "Initialize Git learning project");
  git(sandboxRoot, "init", "--bare", remoteRepository);
  git(studentRepository, "remote", "add", "origin", remoteRepository);
  git(studentRepository, "push", "-u", "origin", "main");

  append(studentRepository, "practice/intro.md", "저는 Git으로 문서 변경을 저장하는 연습을 합니다.");
  commit(studentRepository, ["practice/intro.md"], "Add my intro");
  git(studentRepository, "push", "origin", "main");

  replace(
    studentRepository,
    "practice/profile.md",
    "- 관심사: 문서 정리",
    "- 관심사: Git으로 변경 정리하기",
  );
  commit(studentRepository, ["practice/profile.md"], "Update profile practice");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/profile-edit");
  append(studentRepository, "practice/profile.md", "- 브랜치 연습: 원본과 따로 수정해 보기");
  commit(studentRepository, ["practice/profile.md"], "Add branch profile note");
  git(studentRepository, "push", "-u", "origin", "branch/profile-edit");
  git(studentRepository, "switch", "main");
  git(studentRepository, "merge", "--no-edit", "branch/profile-edit");
  write(
    studentRepository,
    "practice/merge-log.md",
    "# Merge Log\n\n- Step 4: branch/profile-edit을 main에 fast-forward로 합쳤습니다.\n",
  );
  commit(studentRepository, ["practice/merge-log.md"], "Record fast-forward merge");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/add-diary");
  write(
    studentRepository,
    "practice/diary.md",
    "# Diary\n\n오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.\n",
  );
  commit(studentRepository, ["practice/diary.md"], "Add diary practice");
  git(studentRepository, "switch", "main");
  git(studentRepository, "merge", "--no-edit", "branch/add-diary");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/edit-profile");
  append(studentRepository, "practice/profile.md", "- 추가 연습: 서로 다른 파일 수정");
  commit(studentRepository, ["practice/profile.md"], "Edit profile for merge practice");
  git(studentRepository, "switch", "main");
  git(studentRepository, "switch", "-c", "branch/edit-goal");
  replace(
    studentRepository,
    "practice/goal.md",
    "변경된 파일을 확인하고 커밋",
    "변경된 파일을 확인하고 브랜치 변경을 합치기",
  );
  commit(studentRepository, ["practice/goal.md"], "Edit goal for merge practice");
  git(studentRepository, "switch", "main");
  git(studentRepository, "merge", "--no-edit", "branch/edit-profile");
  git(studentRepository, "merge", "--no-edit", "branch/edit-goal");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/profile-name");
  replace(studentRepository, "practice/profile.md", "Git Learner", "Git Beginner");
  commit(studentRepository, ["practice/profile.md"], "Update profile name");
  git(studentRepository, "switch", "main");
  git(studentRepository, "switch", "-c", "branch/profile-note");
  append(studentRepository, "practice/profile.md", "- 줄 위치 연습: 아래 줄 추가");
  commit(studentRepository, ["practice/profile.md"], "Add profile note");
  git(studentRepository, "switch", "main");
  git(studentRepository, "merge", "--no-edit", "branch/profile-name");
  git(studentRepository, "merge", "--no-edit", "branch/profile-note");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/intro-other");
  git(studentRepository, "switch", "main");
  replace(
    studentRepository,
    "practice/intro.md",
    "오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.",
    "오늘은 main에서 Git 변경 기록을 확인합니다.",
  );
  commit(studentRepository, ["practice/intro.md"], "Edit intro on main");
  git(studentRepository, "switch", "branch/intro-other");
  replace(
    studentRepository,
    "practice/intro.md",
    "오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.",
    "오늘은 다른 branch에서 같은 문장을 수정합니다.",
  );
  commit(studentRepository, ["practice/intro.md"], "Edit intro on other branch");
  git(studentRepository, "switch", "main");
  assert(
    expectedGitFailure(studentRepository, "merge", "branch/intro-other").includes("CONFLICT"),
    "Step 8 did not create a conflict",
  );
  git(studentRepository, "merge", "--abort");
  assertClean(studentRepository);
  git(studentRepository, "push", "origin", "main", "branch/intro-other");

  assert(
    expectedGitFailure(studentRepository, "merge", "branch/intro-other").includes("CONFLICT"),
    "Step 9 did not recreate the conflict",
  );
  write(
    studentRepository,
    "practice/intro.md",
    "# Intro\n\n안녕하세요. 저는 Git을 처음 연습합니다.\n\nmain과 연습 branch에서 고친 문장을 비교한 뒤 필요한 내용을 함께 남깁니다.\n\n저는 Git으로 문서 변경을 저장하는 연습을 합니다.\n",
  );
  commit(studentRepository, ["practice/intro.md"], "Resolve intro conflict");
  mkdirSync(join(studentRepository, "practice", "task-app"));
  write(
    studentRepository,
    "practice/task-app/tasks.mjs",
    `export const tasks = [
  { title: "환경 준비", done: true },
  { title: "branch 연습", done: false },
  { title: "push 확인", done: false },
];\n`,
  );
  write(
    studentRepository,
    "practice/task-app/format.mjs",
    `export function formatTask(task) {
  return \`\${task.done ? "[x]" : "[ ]"} \${task.title}\`;
}\n`,
  );
  write(
    studentRepository,
    "practice/task-app/index.mjs",
    `import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

for (const task of tasks) {
  console.log(formatTask(task));
}\n`,
  );
  assert(runTaskApp(studentRepository).includes("[x] 환경 준비"), "Step 9 app failed");
  commit(studentRepository, ["practice/task-app"], "Add task app starter");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/format-label");
  git(studentRepository, "switch", "main");
  write(
    studentRepository,
    "practice/task-app/format.mjs",
    `export function formatTask(task) {
  return \`\${task.done ? "✅" : "⬜"} \${task.title}\`;
}\n`,
  );
  commit(studentRepository, ["practice/task-app/format.mjs"], "Use icons in task formatter");
  git(studentRepository, "switch", "branch/format-label");
  write(
    studentRepository,
    "practice/task-app/format.mjs",
    `export function formatTask(task) {
  return \`\${task.done ? "완료" : "대기"}: \${task.title}\`;
}\n`,
  );
  commit(studentRepository, ["practice/task-app/format.mjs"], "Use labels in task formatter");
  git(studentRepository, "switch", "main");
  assert(
    expectedGitFailure(studentRepository, "merge", "branch/format-label").includes("CONFLICT"),
    "Step 10 did not create a conflict",
  );
  write(
    studentRepository,
    "practice/task-app/format.mjs",
    `export function formatTask(task) {
  const label = task.done ? "완료 [x]" : "대기 [ ]";
  return \`\${label} \${task.title}\`;
}\n`,
  );
  commit(studentRepository, ["practice/task-app/format.mjs"], "Resolve task formatter conflict");
  assert(runTaskApp(studentRepository).includes("완료 [x] 환경 준비"), "Step 10 app failed");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/add-priority");
  write(
    studentRepository,
    "practice/task-app/tasks.mjs",
    `export const tasks = [
  { title: "환경 준비", done: true, priority: "high" },
  { title: "branch 연습", done: false, priority: "high" },
  { title: "push 확인", done: false, priority: "normal" },
];\n`,
  );
  commit(studentRepository, ["practice/task-app/tasks.mjs"], "Add task priorities");
  git(studentRepository, "switch", "main");
  rmSync(join(studentRepository, "practice", "task-app", "tasks.mjs"));
  commit(studentRepository, ["practice/task-app/tasks.mjs"], "Remove task data module");
  assert(
    expectedGitFailure(studentRepository, "merge", "branch/add-priority").includes("modify/delete"),
    "Step 11 did not create a modify/delete conflict",
  );
  commit(studentRepository, ["practice/task-app/tasks.mjs"], "Keep prioritized task data");
  assert(runTaskApp(studentRepository).includes("branch 연습"), "Step 11 app failed");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "branch/sort-tasks");
  git(studentRepository, "switch", "main");
  write(
    studentRepository,
    "practice/task-app/index.mjs",
    `import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const completedCount = tasks.filter((task) => task.done).length;
console.log(\`완료: \${completedCount}/\${tasks.length}\`);

for (const task of tasks) {
  console.log(formatTask(task));
}\n`,
  );
  commit(studentRepository, ["practice/task-app/index.mjs"], "Print completed task count");
  git(studentRepository, "switch", "branch/sort-tasks");
  write(
    studentRepository,
    "practice/task-app/index.mjs",
    `import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const sortedTasks = [...tasks].sort(
  (left, right) => Number(left.done) - Number(right.done),
);

for (const task of sortedTasks) {
  console.log(formatTask(task));
}\n`,
  );
  commit(studentRepository, ["practice/task-app/index.mjs"], "Sort pending tasks first");
  git(studentRepository, "switch", "main");
  assert(
    expectedGitFailure(studentRepository, "merge", "branch/sort-tasks").includes("CONFLICT"),
    "Step 12 did not create a conflict",
  );
  write(
    studentRepository,
    "practice/task-app/index.mjs",
    `import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const sortedTasks = [...tasks].sort(
  (left, right) => Number(left.done) - Number(right.done),
);
const completedCount = tasks.filter((task) => task.done).length;

console.log(\`완료: \${completedCount}/\${tasks.length}\`);

for (const task of sortedTasks) {
  console.log(formatTask(task));
}\n`,
  );
  commit(studentRepository, ["practice/task-app/index.mjs"], "Combine task sorting and summary");
  assert(runTaskApp(studentRepository).startsWith("완료: 1/3"), "Step 12 app failed");
  git(studentRepository, "push", "origin", "main");

  git(studentRepository, "switch", "-c", "feature/pending-count");
  replace(
    studentRepository,
    "practice/task-app/index.mjs",
    "const completedCount = tasks.filter((task) => task.done).length;",
    "const completedCount = tasks.filter((task) => task.done).length;\nconst pendingCount = tasks.length - completedCount;",
  );
  replace(
    studentRepository,
    "practice/task-app/index.mjs",
    "console.log(`완료: ${completedCount}/${tasks.length}`);",
    "console.log(`완료: ${completedCount}/${tasks.length}`);\nconsole.log(`대기: ${pendingCount}`);",
  );
  commit(studentRepository, ["practice/task-app/index.mjs"], "Add pending task count");
  git(studentRepository, "switch", "main");
  git(studentRepository, "merge", "--no-ff", "feature/pending-count", "-m", "Merge pending count feature");
  git(studentRepository, "switch", "-c", "feature/high-priority");
  append(
    studentRepository,
    "practice/task-app/index.mjs",
    `
const highPriorityTitles = tasks
  .filter((task) => task.priority === "high")
  .map((task) => task.title);

console.log(\`높은 우선순위: \${highPriorityTitles.join(", ")}\`);`,
  );
  commit(studentRepository, ["practice/task-app/index.mjs"], "List high priority tasks");
  git(studentRepository, "switch", "main");
  git(studentRepository, "merge", "--no-ff", "feature/high-priority", "-m", "Merge high priority feature");
  const finalOutput = runTaskApp(studentRepository);
  assert(finalOutput.includes("대기: 2"), "Step 13 pending count failed");
  assert(finalOutput.includes("높은 우선순위: 환경 준비, branch 연습"), "Step 13 priority list failed");
  git(studentRepository, "push", "origin", "main");

  write(
    studentRepository,
    "practice/completion.md",
    "# Git 실습 완료\n\n- diff와 staged diff를 구분했습니다.\n- 기능 branch를 main에 merge했습니다.\n- conflict를 읽고 코드 실행으로 결과를 검증했습니다.\n- 각 단계의 commit을 GitHub에 push했습니다.\n",
  );
  commit(studentRepository, ["practice/completion.md"], "Complete Git practice course");
  git(studentRepository, "push", "origin", "main");
  assert(
    git(studentRepository, "rev-parse", "main") ===
      git(studentRepository, "rev-parse", "origin/main"),
    "Final push did not update origin/main",
  );

  console.log("Git lecture smoke test passed: step-0 through step-14, code conflicts and pushes checked");
} finally {
  if (process.env.KEEP_GIT_LECTURE_TMP === "1") {
    console.log(`Kept verification sandbox: ${sandboxRoot}`);
  } else {
    rmSync(sandboxRoot, { recursive: true, force: true });
  }
}
