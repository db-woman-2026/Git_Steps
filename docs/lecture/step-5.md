# Step 5. 새 파일을 추가한 브랜치 합치기

## 이번 단계에서 할 일

브랜치에서 새 파일을 만든 뒤 `main`에 합칩니다.

파일 수정과 파일 추가는 Git에서 조금 다르게 보입니다. 수정은 기존 파일의 일부 줄이 바뀐 것이고, 추가는 Git이 처음 보는 파일이 생긴 것입니다. diff에서는 `new file mode` 같은 표시가 보입니다.

완료 후에는 `main` 브랜치에 `practice/diary.md` 파일이 생겨야 합니다.

## 시작 전 확인

step 4를 끝낸 상태에서 시작합니다.

기대 상태는 다음과 같습니다.

- 현재 브랜치: `main`
- `practice/profile.md`에는 브랜치 연습 문장이 들어 있음
- Source Control 변경 목록은 비어 있음
- `practice/diary.md` 파일은 아직 없음

확인 명령:

```bash
git status
test -f practice/diary.md && echo "exists" || echo "not yet"
```

`not yet`이 나오면 정상입니다.

## 작업 1. 새 파일 추가용 브랜치 만들기

### VSCode 절차

1. 왼쪽 아래 브랜치 이름 `main`을 클릭합니다.
2. 새 브랜치를 만듭니다.
3. 브랜치 이름은 다음으로 입력합니다.

```text
branch/add-diary
```

### 명령어로 한다면

```bash
git switch -c branch/add-diary
```

## 작업 2. diary 파일 만들기

### 실습 내용

`practice/diary.md`라는 새 파일을 만듭니다.

### 입력할 내용

`practice` 폴더 안에 `diary.md` 파일을 만들고 다음 내용을 입력합니다.

```md
# Diary

오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.
```

## 작업 3. 새 파일 diff 확인하기

### 명령어

```bash
git diff -- practice/diary.md
```

### 예상 git diff

```diff
diff --git a/practice/diary.md b/practice/diary.md
new file mode 100644
index 0000000..dca01ac
--- /dev/null
+++ b/practice/diary.md
@@ -0,0 +1,3 @@
+# Diary
+
+오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.
```

`/dev/null`은 "이전에는 파일이 없었다"는 뜻으로 이해하면 됩니다. Git이 새 파일을 비교할 때 사용하는 표시입니다.

`@@ -0,0 +1,3 @@`는 이전 파일에는 0줄이었고, 새 파일에는 3줄이 생겼다는 뜻입니다.

## 작업 4. 새 파일 commit하기

### VSCode 절차

1. Source Control에서 `practice/diary.md`가 추가된 파일로 보이는지 확인합니다.
2. 파일을 stage 합니다.
3. commit 메시지를 입력합니다.

```text
Add diary practice
```

4. Commit 버튼을 누릅니다.

### 명령어로 한다면

```bash
git add practice/diary.md
git commit -m "Add diary practice"
```

## 작업 5. main으로 돌아와 merge하기

### 절차

1. `main` 브랜치로 돌아갑니다.
2. `branch/add-diary`를 merge합니다.
3. `practice/diary.md` 파일이 보이는지 확인합니다.

### 명령어로 한다면

```bash
git switch main
git merge branch/add-diary
```

예상 출력에는 다음과 비슷한 내용이 보일 수 있습니다.

```text
Fast-forward
 practice/diary.md | 3 +++
 create mode 100644 practice/diary.md
```

새 파일만 추가한 상황이라 보통 conflict 없이 합쳐집니다.

## 작업 6. merge 후 확인하기

```bash
git status
cat practice/diary.md
```

예상 파일 내용:

```md
# Diary

오늘은 Git에서 새 파일을 추가하는 연습을 했습니다.
```

## 완료 기준

다음 조건을 만족하면 step 5가 완료된 것입니다.

- `main` 브랜치에 있습니다.
- `practice/diary.md` 파일이 있습니다.
- 파일 내용이 문서와 같습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 서로 다른 파일을 수정한 두 브랜치를 차례로 합칩니다.
