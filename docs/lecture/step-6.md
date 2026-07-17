# Step 6. 서로 다른 파일을 고친 브랜치 합치기

## 이번 단계에서 할 일

두 개의 브랜치를 만듭니다.

첫 번째 브랜치는 `practice/profile.md`를 수정합니다. 두 번째 브랜치는 `practice/goal.md`를 수정합니다. 변경 경로가 겹치지 않으므로 두 변경은 자동으로 합쳐집니다.

완료 후에는 `main`에 두 브랜치의 변경이 모두 들어와야 합니다.

## 시작 전 확인

step 5를 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- `practice/diary.md` 파일이 있음
- Source Control 변경 목록이 비어 있음

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```powershell
git status
git branch --show-current
```

## 작업 1. profile 수정 브랜치 만들기

### 절차

새 브랜치 `branch/edit-profile`을 만듭니다.

```powershell
git switch -c branch/edit-profile
```

VSCode에서는 왼쪽 아래 브랜치 이름이 `branch/edit-profile`로 바뀌었는지 확인합니다.

## 작업 2. profile 파일 수정하기

### 입력할 내용

`practice/profile.md` 맨 아래에 다음 줄을 추가합니다.

```md
- 추가 연습: 서로 다른 파일을 고치는 브랜치 만들기
```

### 예상 git diff

```powershell
git diff -- practice/profile.md
```

```diff
diff --git a/practice/profile.md b/practice/profile.md
index da9d4de..57c770c 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -4,3 +4,4 @@
 - 관심사: Git으로 문서 변경 정리하기
 - 오늘의 연습: 변경 내용을 비교하고 저장하기
 - 브랜치 연습: 원본과 따로 수정해 보기
+- 추가 연습: 서로 다른 파일을 고치는 브랜치 만들기
```

### commit

```powershell
git add practice/profile.md
git diff --staged -- practice/profile.md
git commit -m "Edit profile for merge practice"
git status --short
git log --oneline -1
```

stage 전과 같은 한 줄 추가를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Edit profile for merge practice`가 보여야 합니다.

## 작업 3. main으로 돌아가기

두 번째 브랜치는 `main`에서 새로 만들어야 합니다.

```powershell
git switch main
```

VSCode 왼쪽 아래가 `main`인지 확인합니다.

## 작업 4. goal 수정 브랜치 만들기

```powershell
git switch -c branch/edit-goal
```

## 작업 5. goal 파일 수정하기

### 입력할 내용

`practice/goal.md` 파일의 문장을 다음처럼 바꿉니다.

```md
# Goal

이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.
```

### 예상 git diff

```powershell
git diff -- practice/goal.md
```

```diff
diff --git a/practice/goal.md b/practice/goal.md
index 28a679e..6931826 100644
--- a/practice/goal.md
+++ b/practice/goal.md
@@ -1,3 +1,3 @@
 # Goal
 
-이번 수업의 목표는 Git에서 변경된 파일을 확인하고 커밋하는 것입니다.
+이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.
```

### commit

```powershell
git add practice/goal.md
git diff --staged -- practice/goal.md
git commit -m "Edit goal for merge practice"
git status --short
git log --oneline -1
```

stage 전과 같은 한 문장 교체를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Edit goal for merge practice`가 보여야 합니다.

## 작업 6. main으로 돌아와 두 브랜치 merge하기

### 절차

```powershell
git switch main
git merge --no-edit branch/edit-profile
git merge --no-edit branch/edit-goal
```

`--no-edit`은 자동으로 만들어진 merge commit 메시지를 그대로 사용합니다. 두 번째 merge에서 별도의 편집기가 열리지 않게 합니다.

첫 번째 merge는 fast-forward로 끝날 수 있습니다.

두 번째 merge는 다음처럼 merge commit을 만들 수 있습니다.

```text
Merge made by the 'ort' strategy.
 practice/goal.md | 2 +-
```

둘 다 conflict 없이 끝났다면 정상입니다. 첫 번째는 fast-forward, 두 번째는 merge commit으로 표시될 수 있지만 두 파일의 변경은 모두 남아야 합니다.

## 작업 7. merge 결과 확인하기

```powershell
cat practice/profile.md
cat practice/goal.md
git status
git log --oneline --graph --max-count=5
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
Get-Content practice/profile.md -Encoding utf8
Get-Content practice/goal.md -Encoding utf8
git status
git log --oneline --graph --max-count=5
```

`profile.md`에는 추가 연습 줄이 있어야 합니다.

`goal.md`에는 브랜치 변경을 합쳐 본다는 문장이 있어야 합니다.

작업 폴더는 깨끗해야 합니다.

## 완료 기준

다음 조건을 만족하면 step 6이 완료된 것입니다.

- 현재 브랜치가 `main`입니다.
- `practice/profile.md`와 `practice/goal.md` 변경이 모두 들어왔습니다.
- conflict 없이 merge가 끝났습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 같은 파일을 고치지만 위치를 떨어뜨려 자동 merge되는 상황을 연습합니다.
