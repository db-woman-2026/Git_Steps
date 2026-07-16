# Step 2. 변경 내용 비교하기

## 이번 단계에서 할 일

`git diff`에서 파일의 변경 전 줄과 변경 후 줄을 구분합니다.

step 1에서는 문장을 새로 추가했습니다. step 2에서는 기존 문장 두 줄을 다른 문장으로 바꿉니다. 새 줄 추가보다 "교체"가 들어가면 diff에 `-` 줄과 `+` 줄이 함께 나타납니다.

완료 후에는 `practice/profile.md`의 관심사와 오늘의 연습 문장이 바뀌고, 그 변경이 하나의 commit으로 저장되어 있어야 합니다.

## 시작 전 확인

step 1을 끝낸 상태에서 시작합니다.

확인할 상태는 다음과 같습니다.

- 현재 브랜치: `main`
- 마지막 commit 메시지: `Add my intro`
- Source Control 변경 목록: 비어 있음

명령어로 확인하려면 다음을 실행합니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```bash
git status
git log --oneline -1
```

## 작업 1. 프로필 문장 수정하기

### 실습 내용

`practice/profile.md`에서 기존 문장 두 줄을 새 문장으로 바꿉니다.

이번에는 문장을 추가하는 것이 아니라 기존 내용을 교체합니다. 그래서 Git diff에는 사라진 줄과 새 줄이 함께 나타납니다.

### 입력할 내용

`practice/profile.md` 파일을 열면 처음에는 다음과 비슷합니다.

```md
# Profile

- 이름: Git Learner
- 관심사: 문서 정리
- 오늘의 연습: 변경 내용을 저장하기
```

아래 두 줄을 바꿉니다.

```md
- 관심사: Git으로 문서 변경 정리하기
- 오늘의 연습: 변경 내용을 비교하고 저장하기
```

수정 후 전체 파일은 다음처럼 됩니다.

```md
# Profile

- 이름: Git Learner
- 관심사: Git으로 문서 변경 정리하기
- 오늘의 연습: 변경 내용을 비교하고 저장하기
```

## 작업 2. git diff로 바뀐 줄 읽기

### 실습 내용

commit하기 전에 working tree와 마지막 commit의 차이를 확인합니다.

### 명령어

```bash
git diff -- practice/profile.md
```

### 예상 git diff

```diff
diff --git a/practice/profile.md b/practice/profile.md
index 977a5fe..767a26c 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -1,5 +1,5 @@
 # Profile
 
 - 이름: Git Learner
-- 관심사: 문서 정리
-- 오늘의 연습: 변경 내용을 저장하기
+- 관심사: Git으로 문서 변경 정리하기
+- 오늘의 연습: 변경 내용을 비교하고 저장하기
```

`-`로 시작하는 줄은 이전 내용입니다. 파일에서 사라진 줄이라고 생각하면 됩니다.

`+`로 시작하는 줄은 새 내용입니다. 지금 파일에 들어 있는 줄입니다.

이 diff는 "관심사 줄과 오늘의 연습 줄이 교체되었다"는 뜻입니다.

## 작업 3. VSCode diff 화면으로 같은 내용 확인하기

### 절차

1. VSCode Source Control 화면을 엽니다.
2. `practice/profile.md`를 클릭합니다.
3. 왼쪽에 이전 문장, 오른쪽에 새 문장이 보이는지 확인합니다.

### 확인할 것

- 빨간 줄은 사라진 내용입니다.
- 초록 줄은 새로 들어간 내용입니다.
- 파일 이름 옆의 표시가 "수정됨" 상태임을 알려줍니다.

Git diff와 VSCode diff는 같은 정보를 다른 화면으로 보여주는 것입니다.

## 작업 4. Stage 하고 commit하기

### VSCode 절차

1. Source Control에서 `practice/profile.md`를 stage 합니다.
2. commit 메시지에 다음을 입력합니다.

```text
Update profile practice
```

3. Commit 버튼을 누릅니다.

### 명령어로 한다면

```bash
git add practice/profile.md
git diff --staged -- practice/profile.md
```

stage 전 `git diff`에서 본 두 문장 교체가 그대로 보여야 합니다. 확인한 뒤 commit합니다.

```bash
git commit -m "Update profile practice"
```

## 작업 5. commit 후 상태 확인하기

### 명령어

```bash
git status
git log --oneline -2
```

예상 흐름은 다음과 같습니다.

```text
0d13b0f Update profile practice
304a8d1 Add my intro
```

해시 값은 달라도 됩니다. 중요한 것은 step 1 commit 위에 step 2 commit이 하나 더 쌓였다는 점입니다.

## 완료 기준

다음 조건을 만족하면 step 2가 완료된 것입니다.

- `practice/profile.md`의 관심사와 오늘의 연습 문장이 바뀌었습니다.
- commit 전 diff에서 `-` 줄과 `+` 줄의 의미를 확인했습니다.
- `Update profile practice` commit이 만들어졌습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 `main`과 분리된 새 브랜치를 만들어, 원본과 다른 공간에서 수정하는 흐름을 연습합니다.
