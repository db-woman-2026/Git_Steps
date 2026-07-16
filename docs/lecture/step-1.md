# Step 1. 첫 파일 수정 commit 만들기

## 이번 단계에서 할 일

`step-0`에서 만든 초기 commit 위에 첫 파일 수정 commit을 하나 더 만듭니다.

commit은 파일 전체를 다시 저장하는 버튼이라기보다, "이 시점의 변경 내용을 하나의 기록으로 남기는 일"에 가깝습니다. 문서를 고친 뒤 그 변경을 Git에게 보여주고, stage 하고, commit 메시지를 붙여 저장합니다.

완료 후에는 `practice/intro.md`에 새 문장이 추가되고, 그 변경이 `Add my intro` commit으로 저장되어 있어야 합니다.

## 시작 전 확인

step 0을 끝낸 수강생 실습 저장소에서 `main` 브랜치로 시작합니다.

VSCode에서 다음을 확인합니다.

- 왼쪽 아래 브랜치 이름이 `main`인지 확인합니다.
- Source Control 화면에 변경 파일이 없는지 확인합니다.
- `practice/intro.md` 파일이 있는지 확인합니다.

명령어로 확인하고 싶다면 다음을 실행합니다.

```bash
git status
```

정상이라면 `origin/main`과 연결되어 있고, `nothing to commit` 또는 변경할 파일이 없다는 뜻의 메시지가 나옵니다.

## 작업 1. 자기소개 문장 추가하기

### 실습 내용

`practice/intro.md` 파일에 문장을 한 줄 추가합니다.

파일을 크게 바꾸지 않습니다. 변경이 작아야 Git이 보여주는 차이를 눈으로 이해하기 쉽습니다.

### 입력할 내용

`practice/intro.md` 파일을 열고 맨 아래에 다음 문장을 추가합니다.

```md
저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

수정 후 파일은 다음처럼 됩니다.

```md
# Intro

안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.

오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.

저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

### 예상 git diff

아직 commit하지 않은 상태에서 다음 명령을 실행하면 변경 내용을 볼 수 있습니다.

```bash
git diff -- practice/intro.md
```

예상 diff는 다음과 같습니다.

```diff
diff --git a/practice/intro.md b/practice/intro.md
index 4f20b8b..3c1d4f4 100644
--- a/practice/intro.md
+++ b/practice/intro.md
@@ -3,3 +3,5 @@
 안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.
 
 오늘은 문장을 조금씩 바꾸면서 Git 변경 기록을 확인합니다.
+
+저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

`+`로 시작하는 줄이 이번에 새로 추가한 내용입니다. 빈 줄에도 `+`가 붙을 수 있습니다. 빈 줄도 파일 내용의 일부이기 때문입니다.

## 작업 2. VSCode에서 변경 내용 확인하기

### 실습 내용

Git은 파일을 수정하자마자 "이 파일이 바뀌었다"는 사실을 알고 있습니다. VSCode Source Control 화면은 그 상태를 눈으로 보여줍니다.

### 절차

1. VSCode 왼쪽 Source Control 아이콘을 클릭합니다.
2. `practice/intro.md`가 변경 파일로 보이는지 확인합니다.
3. 파일 이름을 클릭합니다.
4. 왼쪽에는 이전 내용, 오른쪽에는 현재 내용이 비교되어 보이는지 확인합니다.

### 확인할 것

- 초록색으로 표시된 줄이 새로 추가한 문장입니다.
- 아직 commit하지 않았기 때문에 Source Control 목록에 파일이 남아 있습니다.
- 이 상태는 "수정은 했지만 Git 기록으로 저장하기 전"입니다.

## 작업 3. Stage 하기

### 실습 내용

stage는 "이번 commit에 이 변경을 포함하겠다"고 고르는 과정입니다.

장바구니에 물건을 담는 것과 비슷합니다. 파일을 수정했다고 바로 결제되는 것이 아니라, commit에 넣을 변경을 먼저 고릅니다.

### VSCode 절차

1. Source Control 화면에서 `practice/intro.md` 오른쪽의 `+` 버튼을 누릅니다.
2. 파일이 Staged Changes 영역으로 이동하는지 확인합니다.

### 명령어로 한다면

```bash
git add practice/intro.md
```

stage 후에는 다음 명령으로 상태를 확인할 수 있습니다.

```bash
git status
```

`practice/intro.md`가 commit될 변경으로 표시되면 정상입니다.

## 작업 4. Commit 하기

### 실습 내용

stage한 변경에 메시지를 붙여 Git 기록으로 저장합니다.

### VSCode 절차

1. Source Control 상단 메시지 입력칸에 다음 메시지를 입력합니다.

```text
Add my intro
```

2. Commit 버튼을 누릅니다.
3. Source Control 변경 목록이 비워졌는지 확인합니다.

### 명령어로 한다면

```bash
git commit -m "Add my intro"
```

## 작업 5. 커밋 기록 확인하기

### 실습 내용

방금 만든 commit이 Git 기록에 남았는지 확인합니다.

### 명령어 확인

```bash
git log --oneline -1
```

예상 결과는 commit 해시 뒤에 메시지가 보이는 형태입니다.

```text
304a8d1 Add my intro
```

해시 값은 컴퓨터마다 다를 수 있습니다. 중요한 것은 `Add my intro` 메시지가 보이는 것입니다.

## 완료 기준

다음 조건을 만족하면 step 1이 완료된 것입니다.

- `practice/intro.md`에 새 자기소개 문장이 추가되어 있습니다.
- Source Control에 남은 변경 파일이 없습니다.
- `git log --oneline -1`에서 `Add my intro` commit이 보입니다.

다음 단계에서는 다른 파일을 수정하고, Git이 변경 전과 변경 후를 어떻게 비교해서 보여주는지 더 자세히 봅니다.
