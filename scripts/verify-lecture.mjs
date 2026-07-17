import { execFileSync, spawnSync } from "node:child_process";
import {
  cpSync,
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

function runGit(cwd, ...args) {
  return run("git", args, cwd);
}

function hasGitRef(cwd, ref) {
  return spawnSync('git', ['rev-parse', '--verify', '--quiet', ref], {
    cwd,
    encoding: 'utf8',
    env: commandEnvironment,
    stdio: 'ignore',
  }).status === 0;
}

function getCourseRef(step) {
  const localRef = `step-${step}`;
  const remoteRef = `origin/${localRef}`;

  if (hasGitRef(repositoryRoot, localRef)) {
    return localRef;
  }

  if (hasGitRef(repositoryRoot, remoteRef)) {
    return remoteRef;
  }

  throw new Error(`Missing course branch: ${localRef}`);
}

function runExpectedFailure(cwd, ...args) {
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
  if (!condition) {
    throw new Error(message);
  }
}

function read(cwd, relativePath) {
  return readFileSync(join(cwd, relativePath), "utf8");
}

function write(cwd, relativePath, contents) {
  writeFileSync(join(cwd, relativePath), contents, "utf8");
}

function replace(cwd, relativePath, before, after) {
  const original = read(cwd, relativePath);
  assert(
    original.includes(before),
    `${relativePath} does not contain the expected text: ${before}`,
  );
  write(cwd, relativePath, original.replace(before, after));
}

function appendParagraph(cwd, relativePath, contents) {
  const original = read(cwd, relativePath).trimEnd();
  write(cwd, relativePath, `${original}\n\n${contents}\n`);
}

function appendLine(cwd, relativePath, contents) {
  const original = read(cwd, relativePath).trimEnd();
  write(cwd, relativePath, `${original}\n${contents}\n`);
}

function assertClean(cwd) {
  assert(runGit(cwd, "status", "--porcelain") === "", "Working tree is not clean");
}

function normalizeDiff(diff) {
  return diff.replace(/^index .+$/gm, "index HASHES").trim();
}

const documentedDiffCache = new Map();
let documentedDiffChecks = 0;

function getDocumentedDiff(step, index) {
  if (!documentedDiffCache.has(step)) {
    const document = runGit(
      repositoryRoot,
      "show",
      `${getCourseRef(step)}:docs/lecture/step-${step}.md`,
    );
    const blocks = [];
    const blockPattern = /(?:```|~~~)diff\r?\n([\s\S]*?)\r?\n(?:```|~~~)/g;

    for (const match of document.matchAll(blockPattern)) {
      blocks.push(match[1].trim());
    }

    documentedDiffCache.set(step, blocks);
  }

  const documentedDiff = documentedDiffCache.get(step)[index];
  assert(documentedDiff, `Missing documented diff ${index + 1} in step-${step}`);
  return documentedDiff;
}

function assertDocumentedDiff(step, index, actualDiff) {
  const expectedDiff = getDocumentedDiff(step, index);
  const actualLines = normalizeDiff(actualDiff).split("\n");
  const expectedLines = normalizeDiff(expectedDiff).split("\n");
  let differentLine = actualLines.findIndex(
    (line, lineIndex) => line !== expectedLines[lineIndex],
  );

  if (differentLine === -1 && actualLines.length !== expectedLines.length) {
    differentLine = Math.min(actualLines.length, expectedLines.length);
  }

  assert(
    differentLine === -1 && actualLines.length === expectedLines.length,
    [
      `step-${step} diff ${index + 1} does not match at line ${differentLine + 1}`,
      `expected: ${expectedLines[differentLine] ?? "<EOF>"}`,
      `actual: ${actualLines[differentLine] ?? "<EOF>"}`,
    ].join("\n"),
  );
  documentedDiffChecks += 1;
}

function commit(cwd, relativePath, message, documentedDiff) {
  runGit(cwd, "add", "--", relativePath);
  const stagedDiff = runGit(cwd, "diff", "--staged", "--", relativePath);
  assert(stagedDiff.length > 0, `No staged diff for ${relativePath}`);
  if (documentedDiff) {
    assertDocumentedDiff(documentedDiff[0], documentedDiff[1], stagedDiff);
  }
  runGit(cwd, "commit", "-m", message);
  assertClean(cwd);
  assert(
    runGit(cwd, "log", "-1", "--format=%s") === message,
    `Missing commit: ${message}`,
  );
}

const repositoryRoot = run("git", ["rev-parse", "--show-toplevel"], process.cwd());
const sandboxRoot = mkdtempSync(join(tmpdir(), "git-lecture-"));
const studentRepository = join(sandboxRoot, "student");
const remoteRepository = join(sandboxRoot, "student-remote.git");

try {
  mkdirSync(studentRepository);
  for (const entry of [".gitignore", "README.md", "practice", "docs/overview"]) {
    cpSync(join(repositoryRoot, entry), join(studentRepository, entry), {
      recursive: true,
    });
  }

  runGit(studentRepository, "init", "-b", "main");
  runGit(studentRepository, "config", "user.name", "Lecture Verifier");
  runGit(studentRepository, "config", "user.email", "lecture@example.com");
  runGit(studentRepository, "add", ".");
  assert(runGit(studentRepository, "diff", "--staged", "--stat").length > 0, "Empty first commit");
  runGit(studentRepository, "commit", "-m", "Initialize Git learning project");
  assertClean(studentRepository);

  runGit(sandboxRoot, "init", "--bare", remoteRepository);
  runGit(studentRepository, "remote", "add", "origin", remoteRepository);
  runGit(studentRepository, "push", "-u", "origin", "main");

  appendParagraph(
    studentRepository,
    "practice/intro.md",
    "저는 Git으로 문서 변경을 저장하는 연습을 합니다.",
  );
  commit(studentRepository, "practice/intro.md", "Add my intro", [1, 0]);

  replace(
    studentRepository,
    "practice/profile.md",
    "- 관심사: 문서 정리\n- 오늘의 연습: 변경 내용을 저장하기",
    "- 관심사: Git으로 문서 변경 정리하기\n- 오늘의 연습: 변경 내용을 비교하고 저장하기",
  );
  commit(studentRepository, "practice/profile.md", "Update profile practice", [2, 0]);

  runGit(studentRepository, "switch", "-c", "branch/profile-edit");
  appendLine(
    studentRepository,
    "practice/profile.md",
    "- 브랜치 연습: 원본과 따로 수정해 보기",
  );
  commit(studentRepository, "practice/profile.md", "Add branch profile note", [3, 0]);
  runGit(studentRepository, "switch", "main");
  assert(!read(studentRepository, "practice/profile.md").includes("브랜치 연습"), "Branch change leaked into main");
  const firstBranchDiff = runGit(
    studentRepository,
    "diff",
    "main..branch/profile-edit",
    "--",
    "practice/profile.md",
  );
  assertDocumentedDiff(3, 1, firstBranchDiff);
  assertDocumentedDiff(4, 0, firstBranchDiff);
  runGit(studentRepository, "merge", "--no-edit", "branch/profile-edit");
  assertClean(studentRepository);

  runGit(studentRepository, "switch", "-c", "branch/add-diary");
  write(
    studentRepository,
    "practice/diary.md",
    "# Diary\n\n오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.\n",
  );
  assert(
    runGit(studentRepository, "diff", "--", "practice/diary.md") === "",
    "An untracked file unexpectedly appeared in unstaged diff",
  );
  commit(studentRepository, "practice/diary.md", "Add diary practice", [5, 0]);
  runGit(studentRepository, "switch", "main");
  runGit(studentRepository, "merge", "--no-edit", "branch/add-diary");

  runGit(studentRepository, "switch", "-c", "branch/edit-profile");
  appendLine(
    studentRepository,
    "practice/profile.md",
    "- 추가 연습: 서로 다른 파일을 고치는 브랜치 만들기",
  );
  commit(studentRepository, "practice/profile.md", "Edit profile for merge practice", [6, 0]);
  runGit(studentRepository, "switch", "main");
  runGit(studentRepository, "switch", "-c", "branch/edit-goal");
  replace(
    studentRepository,
    "practice/goal.md",
    "이번 수업의 목표는 Git에서 변경된 파일을 확인하고 커밋하는 것입니다.",
    "이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.",
  );
  commit(studentRepository, "practice/goal.md", "Edit goal for merge practice", [6, 1]);
  runGit(studentRepository, "switch", "main");
  runGit(studentRepository, "merge", "--no-edit", "branch/edit-profile");
  runGit(studentRepository, "merge", "--no-edit", "branch/edit-goal");
  assertClean(studentRepository);

  runGit(studentRepository, "switch", "-c", "branch/profile-name");
  replace(studentRepository, "practice/profile.md", "- 이름: Git Learner", "- 이름: Git Beginner");
  commit(studentRepository, "practice/profile.md", "Update profile name", [7, 0]);
  runGit(studentRepository, "switch", "main");
  runGit(studentRepository, "switch", "-c", "branch/profile-note");
  appendLine(
    studentRepository,
    "practice/profile.md",
    "- 줄 위치 연습: 같은 파일에서도 떨어진 위치를 수정해 보기",
  );
  commit(studentRepository, "practice/profile.md", "Add profile note", [7, 1]);
  runGit(studentRepository, "switch", "main");
  runGit(studentRepository, "merge", "--no-edit", "branch/profile-name");
  runGit(studentRepository, "merge", "--no-edit", "branch/profile-note");
  assertClean(studentRepository);

  runGit(studentRepository, "switch", "-c", "branch/intro-other");
  runGit(studentRepository, "switch", "main");
  replace(
    studentRepository,
    "practice/intro.md",
    "오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.",
    "오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.",
  );
  commit(studentRepository, "practice/intro.md", "Edit intro on main", [8, 0]);
  runGit(studentRepository, "switch", "branch/intro-other");
  replace(
    studentRepository,
    "practice/intro.md",
    "오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.",
    "오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.",
  );
  commit(studentRepository, "practice/intro.md", "Edit intro on other branch", [8, 1]);
  runGit(studentRepository, "switch", "main");
  assert(
    runExpectedFailure(studentRepository, "merge", "branch/intro-other").includes("CONFLICT"),
    "Step 8 did not create a conflict",
  );
  assert(
    runGit(studentRepository, "status", "--short").includes("UU practice/intro.md"),
    "intro.md is not unmerged",
  );
  write(
    studentRepository,
    "practice/intro.md",
    "# Intro\n\n안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.\n\n오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.\n오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.\n\n저는 Git으로 문서 변경을 저장하는 연습을 합니다.\n",
  );
  commit(studentRepository, "practice/intro.md", "Resolve intro conflict", [9, 0]);

  runGit(studentRepository, "switch", "-c", "branch/goal-other");
  runGit(studentRepository, "switch", "main");
  replace(
    studentRepository,
    "practice/goal.md",
    "이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.",
    "이번 수업의 목표는 main에서 목표 문장을 다시 정리해 보는 것입니다.",
  );
  commit(studentRepository, "practice/goal.md", "Edit goal on main", [10, 0]);
  runGit(studentRepository, "switch", "branch/goal-other");
  replace(
    studentRepository,
    "practice/goal.md",
    "이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.",
    "이번 수업의 목표는 브랜치에서 목표 문장을 다르게 고쳐 보는 것입니다.",
  );
  commit(studentRepository, "practice/goal.md", "Edit goal on branch", [10, 1]);
  runGit(studentRepository, "switch", "main");
  assert(
    runExpectedFailure(studentRepository, "merge", "branch/goal-other").includes("CONFLICT"),
    "Step 10 did not create a conflict",
  );
  write(
    studentRepository,
    "practice/goal.md",
    "# Goal\n\n이번 수업의 목표는 main과 브랜치의 목표 문장을 읽고 하나의 자연스러운 문장으로 정리하는 것입니다.\n",
  );
  commit(
    studentRepository,
    "practice/goal.md",
    "Resolve goal conflict manually",
    [10, 2],
  );

  runGit(studentRepository, "switch", "-c", "branch/edit-memo");
  write(
    studentRepository,
    "practice/memo.md",
    "# Memo\n\n이 파일은 브랜치에서 내용을 수정한 상태로 남겨 둡니다.\n",
  );
  commit(studentRepository, "practice/memo.md", "Edit memo on branch", [11, 0]);
  runGit(studentRepository, "switch", "main");
  rmSync(join(studentRepository, "practice/memo.md"));
  commit(studentRepository, "practice/memo.md", "Delete memo on main", [11, 1]);
  assert(
    runExpectedFailure(studentRepository, "merge", "branch/edit-memo").includes("modify/delete"),
    "Step 11 did not create a modify/delete conflict",
  );
  assert(read(studentRepository, "practice/memo.md").includes("브랜치에서 내용을 수정"), "Edited memo was not restored");
  commit(studentRepository, "practice/memo.md", "Keep edited memo after conflict");

  runGit(studentRepository, "switch", "-c", "branch/team-note-other");
  runGit(studentRepository, "switch", "main");
  write(
    studentRepository,
    "practice/team-note.md",
    "# Team Note\n\n우리 팀은 main 브랜치에서 충돌 해결 기준을 먼저 정리합니다.\n\n여러 줄을 비교하고 자연스러운 최종 문단으로 고치는 연습을 합니다.\n",
  );
  commit(studentRepository, "practice/team-note.md", "Edit team note on main", [12, 0]);
  runGit(studentRepository, "switch", "branch/team-note-other");
  write(
    studentRepository,
    "practice/team-note.md",
    "# Team Note\n\n우리 팀은 충돌 연습 브랜치에서 문서 변경 내용을 함께 검토합니다.\n\n여러 줄을 고친 뒤 필요한 문장만 남기는 연습을 합니다.\n",
  );
  commit(studentRepository, "practice/team-note.md", "Edit team note on branch", [12, 1]);
  runGit(studentRepository, "switch", "main");
  assert(
    runExpectedFailure(studentRepository, "merge", "branch/team-note-other").includes("CONFLICT"),
    "Step 12 did not create a conflict",
  );
  write(
    studentRepository,
    "practice/team-note.md",
    "# Team Note\n\n우리 팀은 main과 브랜치에서 고친 문단을 함께 검토합니다.\n\n여러 줄을 비교하고 필요한 문장만 남겨 자연스러운 최종 문단으로 정리합니다.\n",
  );
  commit(
    studentRepository,
    "practice/team-note.md",
    "Resolve team note conflict",
    [12, 2],
  );

  runGit(studentRepository, "switch", "-c", "branch/repeat-diary");
  appendParagraph(
    studentRepository,
    "practice/diary.md",
    "반복 연습에서는 브랜치를 만들고 다시 합치는 흐름을 확인합니다.",
  );
  commit(
    studentRepository,
    "practice/diary.md",
    "Repeat branch practice with diary",
    [13, 0],
  );
  runGit(studentRepository, "switch", "main");
  runGit(studentRepository, "merge", "--no-edit", "branch/repeat-diary");
  runGit(studentRepository, "branch", "-d", "branch/repeat-diary");

  runGit(studentRepository, "switch", "-c", "branch/repeat-profile");
  appendLine(
    studentRepository,
    "practice/profile.md",
    "- 반복 연습: 브랜치 만들기, 커밋하기, 합치기",
  );
  commit(
    studentRepository,
    "practice/profile.md",
    "Repeat branch practice with profile",
    [13, 1],
  );
  runGit(studentRepository, "switch", "main");
  runGit(studentRepository, "merge", "--no-edit", "branch/repeat-profile");
  runGit(studentRepository, "branch", "-d", "branch/repeat-profile");
  assertClean(studentRepository);

  runGit(studentRepository, "push");
  assert(
    runGit(studentRepository, "rev-parse", "HEAD") === runGit(studentRepository, "rev-parse", "origin/main"),
    "Final push did not update origin/main",
  );
  assert(documentedDiffChecks === 23, `Checked ${documentedDiffChecks} documented diffs instead of 23`);

  console.log("Git lecture smoke test passed: step-0 through step-14, 23 diffs checked");
} finally {
  if (process.env.KEEP_GIT_LECTURE_TMP === "1") {
    console.log(`Kept verification sandbox: ${sandboxRoot}`);
  } else {
    rmSync(sandboxRoot, { recursive: true, force: true });
  }
}
