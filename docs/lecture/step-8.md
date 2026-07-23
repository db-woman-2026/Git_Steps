# Step 8. 첫 충돌 만들기

## 변경 내용

Git conflict를 일부러 만듭니다. 두 브랜치가 같은 줄을 서로 다른 내용으로 바꾸면 자동 병합이 중단되고 해당 파일이 unmerged 상태로 표시됩니다.

여기서는 conflict를 해결하지 않고 `practice/intro.md`가 conflict 상태로 표시되는 것까지 확인합니다.

## 시작 전 확인

step 7을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- `practice/intro.md`에는 step 1에서 추가한 문장이 있음

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```powershell
git status
Get-Content -LiteralPath 'practice/intro.md' -Encoding utf8
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
git status
Get-Content practice/intro.md -Encoding utf8
```

## 작업 1. conflict용 브랜치를 먼저 만들기

### 왜 먼저 만드는가

conflict를 만들려면 두 브랜치가 같은 시작점에서 갈라져야 합니다.

먼저 브랜치를 만들고, 그다음 `main`과 새 브랜치에서 같은 줄을 다르게 고쳐야 두 변경의 공통 시작점이 유지됩니다.

### 명령어

```powershell
git switch -c branch/intro-other
```

브랜치를 만들었으면 바로 `main`으로 돌아갑니다.

```powershell
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

```powershell
git diff -- practice/intro.md
```

```diff
diff --git a/practice/intro.md b/practice/intro.md
index 3c1d4f4..95b1c3f 100644
--- a/practice/intro.md
+++ b/practice/intro.md
@@ -2,6 +2,6 @@
 
 안녕하세요. 저는 Git을 처음 연습합니다.
 
-오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.
+오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
 
 저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

### commit

```powershell
git add practice/intro.md
git diff --staged -- practice/intro.md
git commit -m "Edit intro on main"
git status --short
git log --oneline -1
```

stage 전과 같은 문장 교체를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Edit intro on main`이 보여야 합니다.

## 작업 3. 다른 브랜치에서 같은 줄을 다르게 수정하기

### 브랜치 이동

```powershell
git switch branch/intro-other
```

이 브랜치는 main에서 문장을 바꾸기 전에 만들어 두었기 때문에, 아직 원래 문장이 남아 있습니다.

### 입력할 내용

같은 줄을 다음처럼 바꿉니다.

```md
오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
```

### 예상 git diff

```powershell
git diff -- practice/intro.md
```

```diff
diff --git a/practice/intro.md b/practice/intro.md
index 3c1d4f4..69aa926 100644
--- a/practice/intro.md
+++ b/practice/intro.md
@@ -2,6 +2,6 @@
 
 안녕하세요. 저는 Git을 처음 연습합니다.
 
-오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.
+오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
 
 저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

### commit

```powershell
git add practice/intro.md
git diff --staged -- practice/intro.md
git commit -m "Edit intro on other branch"
git status --short
git log --oneline -1
```

stage 전과 같은 문장 교체를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Edit intro on other branch`가 보여야 합니다.

## 작업 4. main에서 merge해서 conflict 만들기

### 브랜치 이동 후 merge

```powershell
git switch main
git merge branch/intro-other
```

예상 출력:

```text
Auto-merging practice/intro.md
CONFLICT (content): Merge conflict in practice/intro.md
Automatic merge failed; fix conflicts and then commit the result.
```

이 메시지가 나오면 conflict 재현에 성공한 것입니다.

상태를 바로 확인합니다.

```powershell
git status --short
git diff --name-only --diff-filter=U
```

예상 출력:

```text
UU practice/intro.md
practice/intro.md
```

`U`는 unmerged를 뜻합니다. 내용을 확인한 뒤 아래 순서로 merge를 중단해야 다른 작업을 시작할 수 있습니다.

## 작업 5. conflict 파일 확인하기

`practice/intro.md`를 열면 다음과 비슷한 표시가 보입니다.

```md
# Intro

안녕하세요. 저는 Git을 처음 연습합니다.

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

## 원격 저장소에 기록하기

충돌 표시를 확인한 뒤 merge를 중단해 작업 폴더를 깨끗하게 되돌립니다. 서로 다르게 commit한 `main`과 `branch/intro-other`를 모두 원격에 저장합니다.

```powershell
git branch --show-current
git status --short
git merge --abort
git status --short
git push origin main branch/intro-other
git status --short --branch
```

push가 끝나면 로컬 commit이 원격 저장소에도 보이는지 확인합니다.

## 완료 기준

다음 조건을 만족하면 Step 8이 완료된 것입니다.

- 현재 브랜치는 `main`입니다.
- VS Code에서 `practice/intro.md`의 conflict 표시를 확인했습니다.
- `git merge --abort` 후 작업 파일 목록이 비었습니다.
- `main`과 `branch/intro-other`의 commit을 모두 push했습니다.
