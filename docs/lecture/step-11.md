# Step 11. 한쪽은 수정하고 한쪽은 삭제한 파일 합치기

## 이번 단계에서 할 일

modify/delete conflict를 다룹니다.

한 브랜치에서는 `practice/memo.md`를 수정하고 `main`에서는 같은 파일을 삭제합니다. merge하면 modify/delete conflict가 발생하며 파일을 남길지 삭제할지 직접 정해야 합니다.

이번 실습에서는 최종적으로 파일을 살리는 선택을 합니다.

## 시작 전 확인

step 10을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- `practice/memo.md` 파일이 존재함

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```powershell
git status
cat practice/memo.md
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
git status
Get-Content practice/memo.md -Encoding utf8
```

## 작업 1. memo 수정 브랜치 만들기

```powershell
git switch -c branch/edit-memo
```

## 작업 2. 브랜치에서 memo 수정하기

### 입력할 내용

`practice/memo.md` 내용을 다음처럼 바꿉니다.

```md
# Memo

이 파일은 브랜치에서 내용을 수정한 상태로 남겨 둡니다.
```

### 예상 git diff

```powershell
git diff -- practice/memo.md
```

```diff
diff --git a/practice/memo.md b/practice/memo.md
index ecdb6bc..32b6157 100644
--- a/practice/memo.md
+++ b/practice/memo.md
@@ -1,3 +1,3 @@
 # Memo
 
-이 파일은 나중에 수정과 삭제가 동시에 일어나는 상황을 연습할 때 사용합니다.
+이 파일은 브랜치에서 내용을 수정한 상태로 남겨 둡니다.
```

### commit

```powershell
git add practice/memo.md
git diff --staged -- practice/memo.md
git commit -m "Edit memo on branch"
git status --short
git log --oneline -1
```

stage 전과 같은 문장 교체를 확인합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Edit memo on branch`가 보여야 합니다.

## 작업 3. main으로 돌아와 같은 파일 삭제하기

```powershell
git switch main
```

VSCode Explorer에서 `practice/memo.md`를 삭제합니다.

명령어로 한다면 다음과 같습니다.

```powershell
rm practice/memo.md
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
Remove-Item practice/memo.md
```

삭제 후 diff를 확인합니다.

```powershell
git diff -- practice/memo.md
```

예상 diff:

```diff
diff --git a/practice/memo.md b/practice/memo.md
deleted file mode 100644
index ecdb6bc..0000000
--- a/practice/memo.md
+++ /dev/null
@@ -1,3 +0,0 @@
-# Memo
-
-이 파일은 나중에 수정과 삭제가 동시에 일어나는 상황을 연습할 때 사용합니다.
```

삭제도 Git에서는 변경입니다. 그래서 삭제 상태를 commit해야 합니다.

```powershell
git add practice/memo.md
git diff --staged -- practice/memo.md
git commit -m "Delete memo on main"
git status --short
git log --oneline -1
```

staged diff에도 `deleted file mode`가 보여야 합니다. commit 후 상태 출력은 없어야 하고 마지막 log에는 `Delete memo on main`이 보여야 합니다.

## 작업 4. 수정 브랜치를 merge해서 conflict 만들기

```powershell
git merge branch/edit-memo
```

예상 출력:

```text
CONFLICT (modify/delete): practice/memo.md deleted in HEAD and modified in branch/edit-memo.
Automatic merge failed; fix conflicts and then commit the result.
```

상태를 확인합니다.

```powershell
git status --short
```

예상 출력:

```text
DU practice/memo.md
```

`DU`는 현재 브랜치에서 삭제했고 들어오는 브랜치에서 수정한 unmerged 파일이라는 뜻입니다.

이번 conflict는 같은 줄을 다르게 고친 conflict와 다릅니다. 파일 안에 `<<<<<<<` 표시가 생기지 않을 수 있으며 수정된 파일이 작업 폴더에 남습니다.

## 작업 5. 파일을 살리는 선택하기

이번 실습에서는 파일을 남깁니다.

`practice/memo.md`가 다음 내용으로 남아 있는지 확인합니다.

```md
# Memo

이 파일은 브랜치에서 내용을 수정한 상태로 남겨 둡니다.
```

파일을 살리려면 이 파일을 stage 합니다.

```powershell
git add practice/memo.md
git status --short
git diff --staged -- practice/memo.md
```

`A  practice/memo.md`가 보이고 staged diff에는 브랜치에서 수정한 파일 전체가 추가된 것으로 나와야 합니다. 현재 `HEAD`에서는 이 파일이 삭제되어 있기 때문입니다.

삭제를 선택한다면 `git rm practice/memo.md`로 삭제 상태를 stage합니다. 이번 실습에서는 실행하지 않습니다.

## 작업 6. 해결 commit 만들기

```powershell
git commit -m "Keep edited memo after conflict"
git status --short
git log --oneline -1
```

상태 출력은 없어야 하고 마지막 log에는 `Keep edited memo after conflict`가 보여야 합니다.

## 작업 7. 상태 확인하기

```powershell
git status
cat practice/memo.md
git log --oneline -1
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
git status
Get-Content practice/memo.md -Encoding utf8
git log --oneline -1
```

작업 폴더가 깨끗하고 `practice/memo.md`가 남아 있으면 정상입니다.

## 완료 기준

다음 조건을 만족하면 step 11이 완료된 것입니다.

- modify/delete conflict를 실제로 확인했습니다.
- 최종 선택으로 `practice/memo.md`를 살렸습니다.
- `Keep edited memo after conflict` commit이 만들어졌습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 여러 줄 문단에서 conflict가 나는 상황을 해결합니다.
