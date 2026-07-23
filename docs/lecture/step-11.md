# Step 11. 코드 파일 수정·삭제 conflict 해결하기

## 변경 내용

한 branch에서는 할 일 데이터에 우선순위를 추가하고, `main`에서는 같은 모듈을 삭제합니다. modify/delete conflict를 만든 뒤 수정된 모듈을 살립니다.

## 시작 전 확인

```powershell
git branch --show-current
git status --short
node .\practice\task-app\index.mjs
```

## 작업 1. 우선순위 branch 만들기

```powershell
git switch -c branch/add-priority
```

`practice/task-app/tasks.mjs`를 다음처럼 바꿉니다.

```js
export const tasks = [
  { title: "환경 준비", done: true, priority: "high" },
  { title: "branch 연습", done: false, priority: "high" },
  { title: "push 확인", done: false, priority: "normal" },
];
```

```powershell
git diff -- .\practice\task-app\tasks.mjs
git add .\practice\task-app\tasks.mjs
git diff --staged -- .\practice\task-app\tasks.mjs
git commit -m "Add task priorities"
```

## 작업 2. main에서 모듈 삭제하기

```powershell
git switch main
Remove-Item -LiteralPath '.\practice\task-app\tasks.mjs'
git diff -- .\practice\task-app\tasks.mjs
git add .\practice\task-app\tasks.mjs
git diff --staged -- .\practice\task-app\tasks.mjs
git commit -m "Remove task data module"
```

이 상태에서 프로그램을 실행하면 import할 파일이 없어 실패합니다. 오류를 확인하고 다음 merge로 복구합니다.

```powershell
node .\practice\task-app\index.mjs
```

## 작업 3. modify/delete conflict 만들기

```powershell
git merge branch/add-priority
git status --short
```

`DU practice/task-app/tasks.mjs`가 표시됩니다. 파일 안에 conflict marker가 없어도 Git이 아직 어느 선택을 저장할지 기다리는 상태입니다.

## 작업 4. 수정된 모듈 살리기

```powershell
Get-Content -LiteralPath '.\practice\task-app\tasks.mjs' -Encoding utf8
git add .\practice\task-app\tasks.mjs
git diff --staged -- .\practice\task-app\tasks.mjs
git commit -m "Keep prioritized task data"
node .\practice\task-app\index.mjs
git branch -d branch/add-priority
git push origin main
git status --short --branch
```

프로그램이 다시 실행되고 할 일 세 줄이 출력되어야 합니다.

## 완료 기준

- 코드 모듈의 modify/delete conflict를 확인했습니다.
- 삭제와 유지 중 유지하는 이유를 설명했습니다.
- 우선순위 데이터가 있는 모듈을 살렸습니다.
- 실행 확인 뒤 해결 commit을 push했습니다.
