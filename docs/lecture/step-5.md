# Step 5. 새 파일을 추가한 브랜치 합치기

## 이번 단계에서 할 일

브랜치에서 새 파일을 만든 뒤 `main`에 합칩니다.

파일 수정은 추적 중인 파일의 일부가 바뀐 상태입니다. 파일 추가는 아직 추적하지 않는 파일에서 시작하며, stage한 diff에는 `new file mode`가 표시됩니다.

완료 후에는 `main` 브랜치에 `practice/diary.md` 파일이 생겨야 합니다.

## 시작 전 확인

step 4를 끝낸 상태에서 시작합니다.

기대 상태는 다음과 같습니다.

- 현재 브랜치: `main`
- `practice/profile.md`에는 브랜치 연습 문장이 들어 있음
- Source Control 변경 목록은 비어 있음
- `practice/diary.md` 파일은 아직 없음

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 명령은 PowerShell에서 실행합니다.

```powershell
git status
if (Test-Path practice/diary.md) { "exists" } else { "not yet" }
```

`not yet`이 나오면 정상입니다.

## 작업 1. 새 파일 추가용 브랜치 만들기

### VSCode 절차

1. 왼쪽 아래 브랜치 이름 `main`을 클릭합니다.
2. 새 브랜치를 만듭니다.
3. 브랜치 이름은 다음으로 입력합니다.

```text
branch/add-diary
```

### 명령어로 한다면

```powershell
git switch -c branch/add-diary
```

## 작업 2. diary 파일 만들기

### 실습 내용

`practice/diary.md`라는 새 파일을 만듭니다.

### 입력할 내용

`practice` 폴더 안에 `diary.md` 파일을 만들고 다음 내용을 입력합니다.

```md
# Diary

오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.
```

## 작업 3. 새 파일을 stage하고 diff 확인하기

새 파일은 아직 추적되지 않으므로 `git diff -- practice/diary.md`에 나타나지 않습니다. 먼저 상태에서 `??`를 확인합니다.

```powershell
git status --short -- practice/diary.md
```

예상 출력:

```text
?? practice/diary.md
```

파일을 stage한 뒤 첫 commit과 비교되는 내용을 확인합니다.

```powershell
git add practice/diary.md
git diff --staged -- practice/diary.md
```

### 예상 staged diff

```diff
diff --git a/practice/diary.md b/practice/diary.md
new file mode 100644
index 0000000..dca01ac
--- /dev/null
+++ b/practice/diary.md
@@ -0,0 +1,3 @@
+# Diary
+
+오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.
```

`/dev/null`은 이전 commit에 해당 파일이 없었다는 표시입니다.

`@@ -0,0 +1,3 @@`는 이전 파일에는 0줄이었고, 새 파일에는 3줄이 생겼다는 뜻입니다.

## 작업 4. 새 파일 commit하기

### VSCode 절차

1. Source Control의 Staged Changes에 `practice/diary.md`가 있는지 확인합니다.
2. 파일을 눌러 새 파일 전체가 추가되는 diff를 확인합니다.
3. commit 메시지를 입력합니다.

```text
Add diary practice
```

4. Commit 버튼을 누릅니다.

### 명령어로 한다면

```powershell
git commit -m "Add diary practice"
git status --short
git log --oneline -1
```

상태 출력은 없어야 하고, 마지막 log에는 `Add diary practice`가 보여야 합니다.

## 작업 5. main으로 돌아와 merge하기

### 절차

1. `main` 브랜치로 돌아갑니다.
2. `branch/add-diary`를 merge합니다.
3. `practice/diary.md` 파일이 보이는지 확인합니다.

### 명령어로 한다면

```powershell
git switch main
git merge branch/add-diary
```

예상 출력에는 다음과 비슷한 내용이 보일 수 있습니다.

```text
Fast-forward
 practice/diary.md | 3 +++
 create mode 100644 practice/diary.md
```

새 파일만 추가한 상황이라 보통 conflict 없이 합쳐집니다.

## 작업 6. merge 후 확인하기

```powershell
git status
Get-Content -LiteralPath 'practice/diary.md' -Encoding utf8
git log --oneline -1
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
git status
Get-Content practice/diary.md -Encoding utf8
git log --oneline -1
```

작업 폴더가 깨끗해야 하며 마지막 log에는 `Add diary practice`가 보여야 합니다. 예상 파일 내용은 다음과 같습니다.

```md
# Diary

오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.
```

## 원격 저장소에 기록하기

현재 단계의 commit이 개인 저장소의 `origin/main`에 올라갑니다.

```powershell
git branch --show-current
git status --short
git push origin main
git status --short --branch
```

push가 끝나면 로컬 commit이 원격 저장소에도 보이는지 확인합니다.

## 완료 기준

다음 조건을 만족하면 step 5가 완료된 것입니다.

- `main` 브랜치에 있습니다.
- `practice/diary.md` 파일이 있습니다.
- 파일 내용이 문서와 같습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 서로 다른 파일을 수정한 두 브랜치를 차례로 합칩니다.
