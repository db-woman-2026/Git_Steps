# Step 12. 여러 줄 코드 conflict 통합하기

## 이번 단계에서 할 일

`index.mjs`의 실행 흐름을 두 방향으로 바꿉니다. `main`은 완료 건수를 출력하고 다른 branch는 미완료 항목을 먼저 정렬합니다. conflict를 해결하며 두 동작을 모두 남깁니다.

## 시작 전 확인

```powershell
git branch --show-current
git status --short
node .\practice\task-app\index.mjs
git switch -c branch/sort-tasks
git switch main
```

## 작업 1. main에 완료 건수 추가하기

`practice/task-app/index.mjs`를 다음처럼 바꿉니다.

```js
import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const completedCount = tasks.filter((task) => task.done).length;
console.log(`완료: ${completedCount}/${tasks.length}`);

for (const task of tasks) {
  console.log(formatTask(task));
}
```

```powershell
git add .\practice\task-app\index.mjs
git diff --staged -- .\practice\task-app\index.mjs
git commit -m "Print completed task count"
```

## 작업 2. 다른 branch에서 정렬 추가하기

```powershell
git switch branch/sort-tasks
```

```js
import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const sortedTasks = [...tasks].sort(
  (left, right) => Number(left.done) - Number(right.done),
);

for (const task of sortedTasks) {
  console.log(formatTask(task));
}
```

```powershell
git add .\practice\task-app\index.mjs
git diff --staged -- .\practice\task-app\index.mjs
git commit -m "Sort pending tasks first"
git switch main
git merge branch/sort-tasks
```

## 작업 3. 최종 실행 흐름 작성하기

conflict marker와 중복 import를 지우고 다음 코드를 직접 입력합니다.

```js
import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const sortedTasks = [...tasks].sort(
  (left, right) => Number(left.done) - Number(right.done),
);
const completedCount = tasks.filter((task) => task.done).length;

console.log(`완료: ${completedCount}/${tasks.length}`);

for (const task of sortedTasks) {
  console.log(formatTask(task));
}
```

```powershell
git add .\practice\task-app\index.mjs
git diff --staged -- .\practice\task-app\index.mjs
git commit -m "Combine task sorting and summary"
node .\practice\task-app\index.mjs
git branch -d branch/sort-tasks
git push origin main
git status --short --branch
```

예상 출력:

```text
완료: 1/3
대기 [ ] branch 연습
대기 [ ] push 확인
완료 [x] 환경 준비
```

## 완료 기준

- 여러 줄 JavaScript conflict를 해결했습니다.
- 정렬과 완료 건수를 모두 보존했습니다.
- import가 한 번씩만 남아 있습니다.
- 실행 결과를 확인하고 해결 commit을 push했습니다.
