# Step 9. VSCode 버튼으로 충돌 해결하기

## 이번 스텝 Overview

이번 단계에서는 step 8에서 만든 conflict를 해결합니다.

VSCode는 conflict가 난 파일 위에 몇 가지 버튼을 보여줍니다. 이 버튼들은 Git이 고르지 못한 두 내용을 사람이 선택하기 쉽게 만든 도구입니다.

이번 단계에서는 버튼의 의미를 확인한 뒤, 최종적으로 두 문장을 모두 남기는 방식으로 해결합니다.

## 실습 시작 전 확인

step 8 직후 상태에서 시작합니다.

- 현재 브랜치: `main`
- `practice/intro.md`는 conflict 상태
- 아직 merge 해결 commit을 만들지 않음

확인 명령:

```bash
git status
```

예상 상태에는 `both modified: practice/intro.md` 또는 unmerged path가 표시됩니다.

## 작업 1. conflict 영역 다시 읽기

`practice/intro.md`를 엽니다.

```md
<<<<<<< HEAD
오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
=======
오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
>>>>>>> branch/intro-other
```

`HEAD`는 현재 내가 서 있는 브랜치입니다. 지금은 `main`입니다.

`branch/intro-other`는 merge로 들어오려는 브랜치입니다.

VSCode에서는 보통 다음 버튼을 보여줍니다.

- `Accept Current Change`
- `Accept Incoming Change`
- `Accept Both Changes`
- `Compare Changes`

## 작업 2. 버튼을 눌러 의미 확인하기

### Current 확인

`Accept Current Change`를 누르면 현재 브랜치인 `main`의 문장이 남습니다.

남는 문장:

```md
오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
```

확인만 했다면 `Ctrl+Z`로 되돌립니다.

### Incoming 확인

`Accept Incoming Change`를 누르면 들어오는 브랜치인 `branch/intro-other`의 문장이 남습니다.

남는 문장:

```md
오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
```

확인만 했다면 다시 `Ctrl+Z`로 되돌립니다.

### Both 확인

`Accept Both Changes`를 누르면 두 문장이 모두 남습니다.

이번 실습에서는 최종 선택으로 `Accept Both Changes`를 사용합니다.

## 작업 3. 최종 파일 내용 확인하기

최종적으로 `practice/intro.md`의 해당 부분은 다음처럼 되어야 합니다.

```md
# Intro

안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.

오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.

저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

conflict marker인 `<<<<<<<`, `=======`, `>>>>>>>`가 남아 있으면 아직 해결된 것이 아닙니다.

## 작업 4. 해결 후 diff 확인하기

저장한 뒤 아직 stage하지 않은 상태에서 diff를 확인합니다.

```bash
git diff -- practice/intro.md
```

예상 diff:

```diff
diff --git a/practice/intro.md b/practice/intro.md
index 95b1c3f..23f08b3 100644
--- a/practice/intro.md
+++ b/practice/intro.md
@@ -4,5 +4,6 @@
 안녕하세요. 저는 Git을 처음 연습하는 학습자입니다.
 
 오늘은 Git 변경 기록을 보면서 main 브랜치의 문장을 수정합니다.
+오늘은 다른 브랜치에서 같은 문장을 다르게 수정합니다.
 
 저는 Git으로 문서 변경을 저장하는 연습을 합니다.
```

main에는 이미 첫 번째 문장이 있었습니다. conflict를 해결하면서 두 번째 문장을 추가로 남겼기 때문에 diff에는 두 번째 문장이 `+`로 보입니다.

## 작업 5. conflict 해결 commit 만들기

### VSCode 절차

1. `practice/intro.md`를 저장합니다.
2. Source Control에서 파일을 stage 합니다.
3. commit 메시지를 입력합니다.

```text
Resolve intro conflict
```

4. Commit 버튼을 누릅니다.

### 명령어로 한다면

```bash
git add practice/intro.md
git commit -m "Resolve intro conflict"
```

## 작업 6. 완료 상태 확인하기

```bash
git status
git log --oneline --graph --max-count=5
```

작업 폴더가 깨끗해야 합니다.

그래프에는 merge 흐름이 보일 수 있습니다. 지금은 그래프 모양을 완전히 이해하지 않아도 됩니다. 중요한 것은 conflict를 해결하고 commit까지 완료했다는 점입니다.

## 완료 기준

다음 조건을 만족하면 step 9가 완료된 것입니다.

- `practice/intro.md`에 conflict marker가 없습니다.
- 두 문장이 모두 남아 있습니다.
- `Resolve intro conflict` commit이 만들어졌습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 버튼으로 고르지 않고, 사람이 직접 새 문장을 작성해서 conflict를 해결합니다.
