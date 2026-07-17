# Step 10. 직접 문장을 고쳐 충돌 해결하기

## 이번 단계에서 할 일

conflict를 다시 만들고, 이번에는 버튼으로 한쪽을 고르지 않습니다.

두 브랜치의 문장을 모두 읽은 뒤 최종 문장을 직접 작성합니다. 어느 한쪽도 그대로 남기지 않는 해결 방법을 연습합니다.

완료 후에는 `practice/goal.md` conflict가 해결되고, 직접 작성한 최종 문장이 commit되어 있어야 합니다.

## 시작 전 확인

step 9를 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- `practice/goal.md`는 step 6에서 수정한 문장을 가지고 있음

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```powershell
git status
cat practice/goal.md
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
git status
Get-Content practice/goal.md -Encoding utf8
```

현재 목표 문장은 다음과 같아야 합니다.

```md
이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.
```

## 작업 1. conflict용 브랜치 먼저 만들기

```powershell
git switch -c branch/goal-other
git switch main
```

브랜치를 먼저 만들고 다시 `main`으로 돌아오는 순서를 지켜야 합니다.

## 작업 2. main에서 goal 문장 수정하기

### 입력할 내용

`practice/goal.md`의 목표 문장을 다음처럼 바꿉니다.

```md
이번 수업의 목표는 main에서 목표 문장을 다시 정리해 보는 것입니다.
```

### 예상 git diff

```powershell
git diff -- practice/goal.md
```

```diff
diff --git a/practice/goal.md b/practice/goal.md
index 6931826..fd90ffd 100644
--- a/practice/goal.md
+++ b/practice/goal.md
@@ -1,3 +1,3 @@
 # Goal
 
-이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.
+이번 수업의 목표는 main에서 목표 문장을 다시 정리해 보는 것입니다.
```

### commit

```powershell
git add practice/goal.md
git diff --staged -- practice/goal.md
git commit -m "Edit goal on main"
git status --short
git log --oneline -1
```

stage 전과 같은 문장 교체를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Edit goal on main`이 보여야 합니다.

## 작업 3. 다른 브랜치에서 같은 문장 수정하기

```powershell
git switch branch/goal-other
```

`practice/goal.md`의 같은 문장을 다음처럼 바꿉니다.

```md
이번 수업의 목표는 브랜치에서 목표 문장을 다르게 고쳐 보는 것입니다.
```

diff를 확인합니다.

```powershell
git diff -- practice/goal.md
```

예상 diff:

```diff
diff --git a/practice/goal.md b/practice/goal.md
index 6931826..64285fe 100644
--- a/practice/goal.md
+++ b/practice/goal.md
@@ -1,3 +1,3 @@
 # Goal
 
-이번 수업의 목표는 Git에서 변경된 파일을 확인하고 브랜치 변경을 합쳐 보는 것입니다.
+이번 수업의 목표는 브랜치에서 목표 문장을 다르게 고쳐 보는 것입니다.
```

commit합니다.

```powershell
git add practice/goal.md
git diff --staged -- practice/goal.md
git commit -m "Edit goal on branch"
git status --short
git log --oneline -1
```

stage 전과 같은 문장 교체를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Edit goal on branch`가 보여야 합니다.

## 작업 4. main에서 merge해 conflict 만들기

```powershell
git switch main
git merge branch/goal-other
```

예상 출력:

```text
Auto-merging practice/goal.md
CONFLICT (content): Merge conflict in practice/goal.md
Automatic merge failed; fix conflicts and then commit the result.
```

`git status --short`에서 `UU practice/goal.md`가 보이는지 확인합니다.

## 작업 5. conflict 내용을 읽고 새 문장 작성하기

`practice/goal.md`를 열면 다음과 비슷한 내용이 보입니다.

```md
# Goal

<<<<<<< HEAD
이번 수업의 목표는 main에서 목표 문장을 다시 정리해 보는 것입니다.
=======
이번 수업의 목표는 브랜치에서 목표 문장을 다르게 고쳐 보는 것입니다.
>>>>>>> branch/goal-other
```

이번에는 Current나 Incoming 중 하나를 그대로 고르지 않습니다.

두 문장의 의미를 합쳐 다음 최종 문장으로 바꿉니다.

```md
# Goal

이번 수업의 목표는 main과 브랜치의 목표 문장을 읽고 하나의 자연스러운 문장으로 정리하는 것입니다.
```

conflict marker는 모두 삭제되어야 합니다.

## 작업 6. 해결 파일을 stage하고 diff 확인하기

```powershell
git add practice/goal.md
git diff --staged -- practice/goal.md
```

예상 staged diff:

```diff
diff --git a/practice/goal.md b/practice/goal.md
index fd90ffd..a6ecab9 100644
--- a/practice/goal.md
+++ b/practice/goal.md
@@ -1,3 +1,3 @@
 # Goal
 
-이번 수업의 목표는 main에서 목표 문장을 다시 정리해 보는 것입니다.
+이번 수업의 목표는 main과 브랜치의 목표 문장을 읽고 하나의 자연스러운 문장으로 정리하는 것입니다.
```

staged diff에는 `main`의 문장에서 최종 문장으로 바뀐 내용이 보입니다. stage 전의 unmerged 파일에 `git diff`를 실행하면 두 부모를 함께 표시하는 combined diff가 나오므로 이 예시와 형식이 다릅니다.

## 작업 7. 해결 commit 만들기

```powershell
git status --short
git commit -m "Resolve goal conflict manually"
git status --short
git log --oneline -1
```

commit 전에는 `M  practice/goal.md`가 보여야 합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Resolve goal conflict manually`가 보여야 합니다.

## 완료 기준

다음 조건을 만족하면 step 10이 완료된 것입니다.

- `practice/goal.md`에 conflict marker가 없습니다.
- 최종 문장이 직접 정리한 문장입니다.
- `Resolve goal conflict manually` commit이 만들어졌습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 한쪽 브랜치에서는 파일을 수정하고, 다른 쪽에서는 같은 파일을 삭제한 충돌을 다룹니다.
