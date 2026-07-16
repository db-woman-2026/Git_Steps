# Step 8. 첫 충돌 만들기

## 이번 단계에서 할 일

Git conflict를 일부러 만듭니다.

conflict는 Git이 게을러서 생기는 문제가 아닙니다. 같은 부분을 두 브랜치가 서로 다르게 고쳤기 때문에, Git이 "어느 쪽을 남겨야 하죠?"라고 사람에게 묻는 상황입니다.

이번 단계의 목표는 conflict를 해결하는 것이 아닙니다. `practice/intro.md`가 conflict 상태로 표시되는 것까지가 목표입니다. 해결은 step 9에서 합니다.

## 시작 전 확인

step 7을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- `practice/intro.md`에는 step 1에서 추가한 문장이 있음

확인 명령:

```bash
git status
cat practice/intro.md
```

## 작업 1. conflict용 브랜치를 먼저 만들기

### 왜 먼저 만드는가

conflict를 만들려면 두 브랜치가 같은 시작점에서 갈라져야 합니다.

먼저 브랜치를 만들고, 그 다음 `main`과 새 브랜치에서 같은 줄을 다르게 고쳐야 Git이 두 변경 사이에서 판단하지 못합니다.

### 명령어

```bash
git switch -c branch/intro-other
```

브랜치를 만들었으면 바로 `main`으로 돌아갑니다.

```bash
git switch main
```

## 작업 2. main에서 intro 문장 수정하기

### 입력할 내용

`practice/intro.md`에서 다음 줄을 찾습니다.

```md
오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.
```

그 줄을 다음처럼 바꿉니다.

```md
오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
```

### 예상 git diff

```bash
git diff -- practice/intro.md
```

```diff
diff --git a/practice/intro.md b/practice/intro.md
index 3c1d4f4..95b1c3f 100644
--- a/practice/intro.md
+++ b/practice/intro.md
@@ -2,6 +2,6 @@
 
 안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.
 
-오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.
+오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
 
 저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

### commit

```bash
git add practice/intro.md
git commit -m "Edit intro on main"
```

## 작업 3. 다른 브랜치에서 같은 줄을 다르게 수정하기

### 브랜치 이동

```bash
git switch branch/intro-other
```

이 브랜치는 main에서 문장을 바꾸기 전에 만들어 두었기 때문에, 아직 원래 문장이 남아 있습니다.

### 입력할 내용

같은 줄을 다음처럼 바꿉니다.

```md
오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
```

### 예상 git diff

```bash
git diff -- practice/intro.md
```

```diff
diff --git a/practice/intro.md b/practice/intro.md
index 3c1d4f4..69aa926 100644
--- a/practice/intro.md
+++ b/practice/intro.md
@@ -2,6 +2,6 @@
 
 안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.
 
-오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.
+오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
 
 저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

### commit

```bash
git add practice/intro.md
git commit -m "Edit intro on other branch"
```

## 작업 4. main에서 merge해서 conflict 만들기

### 브랜치 이동 후 merge

```bash
git switch main
git merge branch/intro-other
```

예상 출력:

```text
Auto-merging practice/intro.md
CONFLICT (content): Merge conflict in practice/intro.md
Automatic merge failed; fix conflicts and then commit the result.
```

이 메시지가 나오면 실습이 실패한 것이 아니라 성공한 것입니다. 이번 단계의 목표가 conflict를 만드는 것이기 때문입니다.

## 작업 5. conflict 파일 확인하기

`practice/intro.md`를 열면 다음과 비슷한 표시가 보입니다.

```md
# Intro

안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.

<<<<<<< HEAD
오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
=======
오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
>>>>>>> branch/intro-other

저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

`<<<<<<< HEAD` 아래는 현재 브랜치인 `main`의 내용입니다.

`=======` 아래부터 `>>>>>>> branch/intro-other` 위까지는 merge로 들어오려는 브랜치의 내용입니다.

이 표시를 conflict marker라고 부릅니다.

## 완료 기준

다음 조건을 만족하면 step 8이 완료된 것입니다.

- 현재 브랜치는 `main`입니다.
- `git status`에서 `practice/intro.md`가 conflict 상태로 보입니다.
- VSCode에서 `practice/intro.md`에 conflict 표시가 보입니다.
- 아직 conflict를 해결하지 않았습니다.

다음 단계에서는 이 conflict를 VSCode 버튼으로 해결합니다.
