# Step 10. 함수 한 줄 conflict 해결하기

## 변경 내용

`formatTask()`의 반환 형식을 두 branch에서 다르게 고쳐 conflict를 만듭니다. 두 요구를 합친 최종 코드를 직접 작성하고 실행합니다.

## 시작 전 확인

```powershell
git branch --show-current
git status --short
node .\practice\task-app\index.mjs
```

현재 branch는 `main`이고 작업 파일 목록은 비어 있어야 합니다.

## 작업 1. formatter branch 만들기

```powershell
git switch -c branch/format-label
git switch main
```

## 작업 2. main에서 기호를 바꾸기

`practice/task-app/format.mjs`를 수정합니다.

```js
export function formatTask(task) {
  return `${task.done ? "✅" : "⬜"} ${task.title}`;
}
```

```powershell
git diff -- .\practice\task-app\format.mjs
git add .\practice\task-app\format.mjs
git diff --staged -- .\practice\task-app\format.mjs
git commit -m "Use icons in task formatter"
```

## 작업 3. 다른 branch에서 상태 단어 넣기

```powershell
git switch branch/format-label
```

같은 함수를 다음처럼 수정합니다.

```js
export function formatTask(task) {
  return `${task.done ? "완료" : "대기"}: ${task.title}`;
}
```

```powershell
git diff -- .\practice\task-app\format.mjs
git add .\practice\task-app\format.mjs
git diff --staged -- .\practice\task-app\format.mjs
git commit -m "Use labels in task formatter"
```

## 작업 4. conflict 만들기

```powershell
git switch main
git merge branch/format-label
git status --short
```

`UU practice/task-app/format.mjs`가 표시되어야 합니다.

## 작업 5. 두 요구 합치기

상태 단어와 기호를 모두 남깁니다.

```js
export function formatTask(task) {
  const label = task.done ? "완료 [x]" : "대기 [ ]";
  return `${label} ${task.title}`;
}
```

```powershell
git add .\practice\task-app\format.mjs
git diff --staged -- .\practice\task-app\format.mjs
git commit -m "Resolve task formatter conflict"
node .\practice\task-app\index.mjs
git branch -d branch/format-label
git push origin main
git status --short --branch
```

예상 출력:

```text
완료 [x] 환경 준비
대기 [ ] branch 연습
대기 [ ] push 확인
```

## 완료 기준

- 실제 JavaScript 함수에서 conflict를 만들었습니다.
- 두 요구를 설명할 수 있는 최종 반환값을 작성했습니다.
- Node.js 실행이 성공했습니다.
- 해결 commit을 `origin/main`에 push했습니다.
