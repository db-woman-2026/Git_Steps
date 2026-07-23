# Step 9. 충돌을 해결하고 JavaScript 실습 준비하기

## 변경 내용

Step 8에서 확인한 conflict를 다시 만들고 VS Code에서 해결합니다. 해결 commit을 push한 뒤 후반부에 사용할 작은 할 일 프로그램을 직접 입력합니다.

## 시작 전 확인

- 현재 branch: `main`
- 작업 파일 목록: 비어 있음
- `branch/intro-other` branch가 있음

```powershell
git branch --show-current
git status --short
git branch --list
```

## 작업 1. conflict 다시 만들기

```powershell
git merge branch/intro-other
git status --short
```

`UU practice/intro.md`가 표시되어야 합니다. VS Code의 Source Control에서 파일을 열고 Current와 Incoming 문장을 모두 읽습니다.

## 작업 2. 최종 문장 직접 입력하기

`practice/intro.md`를 다음처럼 정리합니다. conflict marker는 입력하지 않습니다.

```md
# Intro

안녕하세요. 저는 Git을 처음 연습합니다.

main과 연습 branch에서 고친 문장을 비교한 뒤 필요한 내용을 함께 남깁니다.

저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

```powershell
git add practice/intro.md
git diff --staged -- practice/intro.md
git commit -m "Resolve intro conflict"
git status --short
git push origin main
git push origin --delete branch/intro-other
git branch -d branch/intro-other
```

원격 branch 삭제가 이미 끝났다는 메시지가 나오면 GitHub의 branch 목록을 확인하고 다음 작업으로 넘어갑니다.

## 작업 3. 코드 폴더 만들기

```powershell
New-Item -ItemType Directory -Path '.\practice\task-app' -Force | Out-Null
```

세 파일을 VS Code에서 만들고 코드를 위에서부터 직접 입력합니다.

### `practice/task-app/tasks.mjs`

```js
export const tasks = [
  { title: "환경 준비", done: true },
  { title: "branch 연습", done: false },
  { title: "push 확인", done: false },
];
```

### `practice/task-app/format.mjs`

```js
export function formatTask(task) {
  return `${task.done ? "[x]" : "[ ]"} ${task.title}`;
}
```

### `practice/task-app/index.mjs`

```js
import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

for (const task of tasks) {
  console.log(formatTask(task));
}
```

## 작업 4. 실행하고 첫 코드 commit 만들기

```powershell
node .\practice\task-app\index.mjs
git status --short
git diff -- .\practice\task-app
git add .\practice\task-app
git diff --staged -- .\practice\task-app
git commit -m "Add task app starter"
git push origin main
git status --short --branch
```

예상 출력:

```text
[x] 환경 준비
[ ] branch 연습
[ ] push 확인
```

## 완료 기준

- conflict marker를 모두 제거했습니다.
- `Resolve intro conflict` commit을 push했습니다.
- 세 JavaScript 모듈을 직접 입력했습니다.
- Node.js 실행 결과 세 줄을 확인했습니다.
- `Add task app starter` commit이 `origin/main`에 있습니다.
