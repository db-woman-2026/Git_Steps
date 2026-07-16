# Step 13. 브랜치 만들고 합치기 반복 연습

## 이번 단계에서 할 일

지금까지 배운 흐름을 반복합니다.

새로운 개념을 많이 추가하지 않습니다. 대신 브랜치를 만들고, 파일을 수정하고, commit하고, `main`으로 돌아와 merge하는 흐름을 두 번 반복합니다.

같은 흐름을 여러 번 실행하며 익힙니다.

## 시작 전 확인

step 12를 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- conflict가 남아 있지 않음

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```bash
git status
git branch --show-current
```

## 반복 1. diary 파일을 고치는 브랜치

### 작업 1. 브랜치 만들기

```bash
git switch -c branch/repeat-diary
```

### 작업 2. diary 파일 수정하기

`practice/diary.md` 맨 아래에 다음 문장을 추가합니다.

```md
반복 연습에서는 브랜치를 만들고 다시 합치는 흐름을 확인합니다.
```

예상 전체 파일:

```md
# Diary

오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.

반복 연습에서는 브랜치를 만들고 다시 합치는 흐름을 확인합니다.
```

### 예상 git diff

```bash
git diff -- practice/diary.md
```

```diff
diff --git a/practice/diary.md b/practice/diary.md
index dca01ac..bf399c8 100644
--- a/practice/diary.md
+++ b/practice/diary.md
@@ -1,3 +1,5 @@
 # Diary
 
 오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.
+
+반복 연습에서는 브랜치를 만들고 다시 합치는 흐름을 확인합니다.
```

### 작업 3. commit하기

```bash
git add practice/diary.md
git diff --staged -- practice/diary.md
git commit -m "Repeat branch practice with diary"
git status --short
git log --oneline -1
```

stage 전과 같은 문장 추가를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Repeat branch practice with diary`가 보여야 합니다.

### 작업 4. main으로 돌아와 merge하기

```bash
git switch main
git merge --no-edit branch/repeat-diary
```

### 작업 5. 사용한 브랜치 삭제하기

브랜치 삭제는 필수는 아니지만, 실습이 끝난 브랜치를 정리하는 경험을 해봅니다.

```bash
git branch -d branch/repeat-diary
```

삭제는 commit을 지우는 것이 아닙니다. 이미 `main`에 merge된 변경은 그대로 남아 있습니다.

## 반복 2. profile 파일을 고치는 브랜치

### 작업 1. 브랜치 만들기

```bash
git switch -c branch/repeat-profile
```

### 작업 2. profile 파일 수정하기

`practice/profile.md` 맨 아래에 다음 줄을 추가합니다.

```md
- 반복 연습: 브랜치 만들기, 커밋하기, 합치기
```

### 예상 git diff

```bash
git diff -- practice/profile.md
```

```diff
diff --git a/practice/profile.md b/practice/profile.md
index 9f3a9bf..6fd2f3d 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -6,3 +6,4 @@
 - 브랜치 연습: 원본과 따로 수정해 보기
 - 추가 연습: 서로 다른 파일을 고치는 브랜치 만들기
 - 줄 위치 연습: 같은 파일에서도 떨어진 위치를 수정해 보기
+- 반복 연습: 브랜치 만들기, 커밋하기, 합치기
```

### 작업 3. commit하기

```bash
git add practice/profile.md
git diff --staged -- practice/profile.md
git commit -m "Repeat branch practice with profile"
git status --short
git log --oneline -1
```

stage 전과 같은 항목 추가를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Repeat branch practice with profile`이 보여야 합니다.

### 작업 4. main으로 돌아와 merge하기

```bash
git switch main
git merge --no-edit branch/repeat-profile
```

### 작업 5. 사용한 브랜치 삭제하기

```bash
git branch -d branch/repeat-profile
```

## 마지막 확인

```bash
git status
git log --oneline --graph --max-count=10
```

작업 폴더는 깨끗해야 합니다.

지금은 그래프의 모든 선을 해석하지 않아도 됩니다. 다음 순서를 다시 실행할 수 있는지 확인합니다.

```text
브랜치 만들기 -> 파일 수정 -> commit -> main으로 이동 -> merge
```

## 완료 기준

다음 조건을 만족하면 step 13이 완료된 것입니다.

- `branch/repeat-diary` 흐름을 완료했습니다.
- `branch/repeat-profile` 흐름을 완료했습니다.
- 두 브랜치의 변경이 모두 `main`에 들어왔습니다.
- 사용한 반복 브랜치를 삭제했습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 로컬 저장소의 결과를 GitHub에 올립니다.
