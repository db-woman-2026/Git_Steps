# Step 3. 첫 브랜치 만들기

## 변경 내용

`main`과 분리된 첫 브랜치를 만듭니다.

브랜치를 만들면 현재 commit에서 별도의 변경 이력을 시작할 수 있습니다. 파일을 실제로 복사하지 않으며, 각 브랜치 이름이 서로 다른 commit을 가리킵니다.

`branch/profile-edit`의 `practice/profile.md`에는 새 문장이 있고 `main`에는 없는 상태를 확인합니다.

## 시작 전 확인

step 2를 끝낸 상태에서 시작합니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```powershell
git status
git branch --show-current
```

기대 상태는 다음과 같습니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- 마지막 commit: `Update profile practice`

VSCode에서는 왼쪽 아래 브랜치 이름이 `main`인지 먼저 확인합니다.

## 작업 1. 새 브랜치 만들기

### 실습 내용

`branch/profile-edit`이라는 새 브랜치를 만듭니다.

브랜치 이름 앞에 `branch/`를 붙이는 것은 필수 규칙은 아닙니다. 이 예제에서는 연습용 브랜치임을 구분하려고 붙입니다.

### VSCode 절차

1. VSCode 왼쪽 아래의 `main` 브랜치 이름을 클릭합니다.
2. 새 브랜치 만들기 메뉴를 선택합니다.
3. 브랜치 이름으로 다음을 입력합니다.

```text
branch/profile-edit
```

4. 왼쪽 아래 브랜치 이름이 `branch/profile-edit`로 바뀌었는지 확인합니다.

### 명령어로 한다면

```powershell
git switch -c branch/profile-edit
```

이전 Git 버전을 쓰는 환경이라면 다음 명령도 같은 역할을 합니다.

```powershell
git checkout -b branch/profile-edit
```

## 작업 2. 브랜치에서만 프로필 문장 추가하기

### 실습 내용

새 브랜치에서 `practice/profile.md` 맨 아래에 문장을 하나 추가합니다.

### 입력할 내용

`practice/profile.md`를 열고 맨 아래에 다음 줄을 추가합니다.

```md
- 브랜치 연습: 원본과 따로 수정해 보기
```

수정 후 파일은 다음처럼 됩니다.

```md
# Profile

- 이름: Git Learner
- 관심사: Git으로 문서 변경 정리하기
- 오늘의 연습: 변경 내용을 비교하고 저장하기
- 브랜치 연습: 원본과 따로 수정해 보기
```

### 예상 git diff

```powershell
git diff -- practice/profile.md
```

```diff
diff --git a/practice/profile.md b/practice/profile.md
index 767a26c..da9d4de 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -3,3 +3,4 @@
 - 이름: Git Learner
 - 관심사: Git으로 문서 변경 정리하기
 - 오늘의 연습: 변경 내용을 비교하고 저장하기
+- 브랜치 연습: 원본과 따로 수정해 보기
```

이번 diff는 새 줄 하나가 추가된 상태입니다.

## 작업 3. 브랜치에서 commit하기

### VSCode 절차

1. Source Control에서 `practice/profile.md`를 stage 합니다.
2. commit 메시지에 다음을 입력합니다.

```text
Add branch profile note
```

3. Commit 버튼을 누릅니다.

### 명령어로 한다면

```powershell
git add practice/profile.md
git diff --staged -- practice/profile.md
```

stage 전과 같은 한 줄 추가가 보이면 commit합니다.

```powershell
git commit -m "Add branch profile note"
git status --short
git log --oneline -1
```

`git status --short`의 출력은 없어야 하고, 마지막 log에는 `Add branch profile note`가 보여야 합니다.

## 작업 4. main으로 돌아가서 차이 확인하기

### 실습 내용

방금 추가한 문장이 `branch/profile-edit`에만 있고 `main`에는 아직 없다는 것을 확인합니다.

### 절차

1. VSCode 왼쪽 아래 브랜치 이름을 클릭합니다.
2. `main`을 선택합니다.
3. `practice/profile.md`를 다시 엽니다.
4. `- 브랜치 연습: 원본과 따로 수정해 보기` 문장이 사라졌는지 확인합니다.

### 명령어로 한다면

```powershell
git switch main
```

그리고 다음 명령으로 문장이 없는지 확인할 수 있습니다.

```powershell
Select-String -LiteralPath 'practice/profile.md' -Pattern '브랜치 연습'
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
Select-String -Path practice/profile.md -Pattern "브랜치 연습"
```

아무 내용도 나오지 않으면 `main`에는 그 문장이 없는 상태입니다.

## 작업 5. 브랜치 사이의 차이 보기

### 실습 내용

`main`과 `branch/profile-edit`의 차이를 Git diff로 확인합니다.

### 명령어

```powershell
git diff main..branch/profile-edit -- practice/profile.md
```

### 예상 git diff

```diff
diff --git a/practice/profile.md b/practice/profile.md
index 767a26c..da9d4de 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -3,3 +3,4 @@
 - 이름: Git Learner
 - 관심사: Git으로 문서 변경 정리하기
 - 오늘의 연습: 변경 내용을 비교하고 저장하기
+- 브랜치 연습: 원본과 따로 수정해 보기
```

이 diff는 "main에는 없고 branch/profile-edit에는 있는 변경"을 보여줍니다.

## 원격 저장소에 기록하기

아직 `main`에 합치지 않은 연습 브랜치이므로 `branch/profile-edit`만 원격에 올립니다.

```powershell
git branch --show-current
git status --short
git push -u origin branch/profile-edit
git status --short --branch
```

push가 끝나면 로컬 commit이 원격 저장소에도 보이는지 확인합니다.

## 완료 기준

다음 조건을 만족하면 step 3이 완료된 것입니다.

- `branch/profile-edit` 브랜치가 있습니다.
- 그 브랜치에는 `Add branch profile note` commit이 있습니다.
- `main`으로 돌아오면 `practice/profile.md`에 브랜치 연습 문장이 없습니다.
- `git diff main..branch/profile-edit -- practice/profile.md`에서 추가될 문장을 확인할 수 있습니다.
