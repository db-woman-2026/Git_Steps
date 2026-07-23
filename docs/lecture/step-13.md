# Step 13. 기능 branch 두 번 반복하기

## 변경 내용

작은 요구사항을 하나씩 별도 branch에서 구현합니다. 각 기능은 실행·commit한 뒤 `main`에 merge하고 push합니다.

## 시작 전 확인

```powershell
git branch --show-current
git status --short
node .\practice\task-app\index.mjs
```

## 기능 1. 대기 건수 추가

```powershell
git switch -c feature/pending-count
```

`practice/task-app/index.mjs`에서 `completedCount` 아래에 대기 건수를 추가하고 첫 출력 두 줄을 정리합니다.

```js
const completedCount = tasks.filter((task) => task.done).length;
const pendingCount = tasks.length - completedCount;

console.log(`완료: ${completedCount}/${tasks.length}`);
console.log(`대기: ${pendingCount}`);
```

```powershell
node .\practice\task-app\index.mjs
git diff -- .\practice\task-app\index.mjs
git add .\practice\task-app\index.mjs
git diff --staged -- .\practice\task-app\index.mjs
git commit -m "Add pending task count"
git switch main
git merge --no-ff feature/pending-count -m "Merge pending count feature"
git branch -d feature/pending-count
git push origin main
```

## 기능 2. 높은 우선순위 목록 추가

```powershell
git switch -c feature/high-priority
```

`for` 반복문 아래에 다음 코드를 추가합니다.

```js
const highPriorityTitles = tasks
  .filter((task) => task.priority === "high")
  .map((task) => task.title);

console.log(`높은 우선순위: ${highPriorityTitles.join(", ")}`);
```

```powershell
node .\practice\task-app\index.mjs
git diff -- .\practice\task-app\index.mjs
git add .\practice\task-app\index.mjs
git diff --staged -- .\practice\task-app\index.mjs
git commit -m "List high priority tasks"
git switch main
git merge --no-ff feature/high-priority -m "Merge high priority feature"
git branch -d feature/high-priority
git push origin main
git status --short --branch
git log --oneline --graph --max-count=10
```

마지막 출력에는 `환경 준비, branch 연습`이 보여야 합니다. Git 그래프에는 기능 commit과 두 merge commit이 남습니다.

## 완료 기준

- 두 기능을 서로 다른 branch에서 구현했습니다.
- 각 branch에서 실행과 diff를 확인한 뒤 commit했습니다.
- 두 기능을 `main`에 merge했습니다.
- 사용한 branch를 정리하고 `main`을 두 번 push했습니다.
- 작업 파일 목록이 비어 있습니다.
