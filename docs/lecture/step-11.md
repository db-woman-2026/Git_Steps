# Step 11. 한쪽은 수정하고 한쪽은 삭제한 파일 합치기

## 이번 스텝 Overview

이번 단계에서는 modify/delete conflict를 다룹니다.

한 브랜치에서는 `practice/memo.md`를 수정합니다. 그런데 `main`에서는 같은 파일을 삭제합니다. merge하면 Git은 "수정한 파일을 살릴까요, 아니면 삭제 상태를 유지할까요?"라고 묻습니다.

이번 실습에서는 최종적으로 파일을 살리는 선택을 합니다.

## 실습 시작 전 확인

step 10을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- `practice/memo.md` 파일이 존재함

확인 명령:

```bash
git status
cat practice/memo.md
```

## 작업 1. memo 수정 브랜치 만들기

```bash
git switch -c branch/edit-memo
```

## 작업 2. 브랜치에서 memo 수정하기

### 직접 타이핑할 내용

`practice/memo.md` 내용을 다음처럼 바꿉니다.

```md
# Memo

이 파일은 브랜치에서 내용을 수정한 상태로 남겨 둡니다.
```

### 예상 git diff

```bash
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

```bash
git add practice/memo.md
git commit -m "Edit memo on branch"
```

## 작업 3. main으로 돌아와 같은 파일 삭제하기

```bash
git switch main
```

VSCode Explorer에서 `practice/memo.md`를 삭제합니다.

명령어로 한다면 다음과 같습니다.

```bash
rm practice/memo.md
```

삭제 후 diff를 확인합니다.

```bash
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

```bash
git add practice/memo.md
git commit -m "Delete memo on main"
```

## 작업 4. 수정 브랜치를 merge해서 conflict 만들기

```bash
git merge branch/edit-memo
```

예상 출력:

```text
CONFLICT (modify/delete): practice/memo.md deleted in HEAD and modified in branch/edit-memo.
Automatic merge failed; fix conflicts and then commit the result.
```

이번 conflict는 같은 줄을 다르게 고친 conflict와 다릅니다. 파일 안에 `<<<<<<<` 표시가 생기지 않을 수 있습니다. 대신 Git은 수정된 파일을 작업 폴더에 남겨 두고, 이 파일을 살릴지 삭제할지 선택하게 합니다.

## 작업 5. 파일을 살리는 선택하기

이번 실습에서는 파일을 남깁니다.

`practice/memo.md`가 다음 내용으로 남아 있는지 확인합니다.

```md
# Memo

이 파일은 브랜치에서 내용을 수정한 상태로 남겨 둡니다.
```

파일을 살리려면 이 파일을 stage 합니다.

```bash
git add practice/memo.md
```

만약 삭제를 선택하고 싶다면 파일을 삭제한 상태를 stage해야 합니다. 하지만 이번 실습에서는 삭제하지 않습니다.

## 작업 6. 해결 commit 만들기

```bash
git commit -m "Keep edited memo after conflict"
```

## 작업 7. 상태 확인하기

```bash
git status
cat practice/memo.md
```

작업 폴더가 깨끗하고 `practice/memo.md`가 남아 있으면 정상입니다.

## 완료 기준

다음 조건을 만족하면 step 11이 완료된 것입니다.

- modify/delete conflict를 실제로 확인했습니다.
- 최종 선택으로 `practice/memo.md`를 살렸습니다.
- `Keep edited memo after conflict` commit이 만들어졌습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 여러 줄 문단에서 conflict가 나는 상황을 해결합니다.
