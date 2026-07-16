# Step 7. 같은 파일의 다른 위치를 고친 브랜치 합치기

## 이번 단계에서 할 일

두 브랜치가 같은 파일을 수정해도 자동으로 합쳐질 수 있음을 확인합니다.

단, "다른 줄"이라는 말만으로는 부족합니다. 서로 바로 붙어 있는 줄을 고치면 Git이 같은 수정 영역으로 판단해서 conflict가 날 수 있습니다. 일부러 멀리 떨어진 위치를 고칩니다.

완료 후에는 `practice/profile.md`에 이름 수정과 맨 아래 추가 문장이 모두 들어와야 합니다.

## 시작 전 확인

step 6을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- `practice/profile.md`에는 `추가 연습` 줄이 있음
- Source Control 변경 목록은 비어 있음

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

```bash
git status
cat practice/profile.md
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
git status
Get-Content practice/profile.md -Encoding utf8
```

## 작업 1. 이름 줄을 고치는 브랜치 만들기

```bash
git switch -c branch/profile-name
```

## 작업 2. 이름 줄 수정하기

### 입력할 내용

`practice/profile.md`에서 이름 줄을 다음처럼 바꿉니다.

```md
- 이름: Git Beginner
```

### 예상 git diff

```bash
git diff -- practice/profile.md
```

```diff
diff --git a/practice/profile.md b/practice/profile.md
index 57c770c..f0616cb 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -1,6 +1,6 @@
 # Profile
 
-- 이름: Git Learner
+- 이름: Git Beginner
 - 관심사: Git으로 문서 변경 정리하기
 - 오늘의 연습: 변경 내용을 비교하고 저장하기
 - 브랜치 연습: 원본과 따로 수정해 보기
```

### commit

```bash
git add practice/profile.md
git commit -m "Update profile name"
```

## 작업 3. main으로 돌아가기

```bash
git switch main
```

이 시점에서 `practice/profile.md`를 열면 이름은 다시 `Git Learner`로 보일 수 있습니다. 정상입니다. 방금 수정은 `branch/profile-name`에만 저장되어 있습니다.

## 작업 4. 파일 맨 아래를 고치는 브랜치 만들기

```bash
git switch -c branch/profile-note
```

## 작업 5. 같은 파일 맨 아래에 문장 추가하기

### 입력할 내용

`practice/profile.md` 맨 아래에 다음 줄을 추가합니다.

```md
- 줄 위치 연습: 같은 파일에서도 떨어진 위치를 수정해 보기
```

### 예상 git diff

```bash
git diff -- practice/profile.md
```

```diff
diff --git a/practice/profile.md b/practice/profile.md
index 57c770c..0cd6b3d 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -5,3 +5,4 @@
 - 오늘의 연습: 변경 내용을 비교하고 저장하기
 - 브랜치 연습: 원본과 따로 수정해 보기
 - 추가 연습: 서로 다른 파일을 고치는 브랜치 만들기
+- 줄 위치 연습: 같은 파일에서도 떨어진 위치를 수정해 보기
```

### commit

```bash
git add practice/profile.md
git commit -m "Add profile note"
```

## 작업 6. main으로 돌아와 두 브랜치 merge하기

```bash
git switch main
git merge branch/profile-name
git merge branch/profile-note
```

첫 번째 merge는 fast-forward일 수 있습니다. 두 번째 merge는 자동 merge commit이 될 수 있습니다.

중요한 것은 conflict가 나지 않고 두 변경이 모두 들어오는 것입니다.

## 작업 7. 결과 확인하기

```bash
cat practice/profile.md
git status
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
Get-Content practice/profile.md -Encoding utf8
git status
```

예상 파일 내용:

```md
# Profile

- 이름: Git Beginner
- 관심사: Git으로 문서 변경 정리하기
- 오늘의 연습: 변경 내용을 비교하고 저장하기
- 브랜치 연습: 원본과 따로 수정해 보기
- 추가 연습: 서로 다른 파일을 고치는 브랜치 만들기
- 줄 위치 연습: 같은 파일에서도 떨어진 위치를 수정해 보기
```

## 부가 설명: 왜 붙어 있는 줄은 위험할까

Git은 줄 하나하나를 완전히 독립된 칸처럼 다루지 않습니다. 주변 줄을 함께 보고 "이 근처가 바뀌었다"고 판단합니다.

그래서 이름 줄과 바로 아래 관심사 줄처럼 붙어 있는 줄을 서로 다른 브랜치에서 고치면, 실제로는 같은 파일의 다른 줄이어도 conflict가 날 수 있습니다.

이름 줄과 파일 맨 아래처럼 떨어진 위치를 사용했기 때문에 Git이 자동으로 합치기 쉽습니다.

## 완료 기준

다음 조건을 만족하면 step 7이 완료된 것입니다.

- 현재 브랜치가 `main`입니다.
- `practice/profile.md`에 이름 수정과 맨 아래 추가 문장이 모두 있습니다.
- conflict 없이 merge가 끝났습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 같은 줄을 서로 다르게 수정해 일부러 conflict를 만듭니다.
