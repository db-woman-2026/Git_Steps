# Step 12. 여러 줄 충돌 해결하기

## 이번 단계에서 할 일

여러 줄로 된 문단에서 conflict를 만듭니다.

한 줄 conflict는 비교적 단순합니다. 여러 줄 conflict는 어느 문장을 남길지 더 천천히 읽어야 합니다. 이때 버튼으로 한쪽을 고르는 것보다, 두 내용을 읽고 새 문단으로 정리하는 방식이 더 자연스럽습니다.

완료 후에는 `practice/team-note.md`의 문단이 직접 정리한 최종 문단으로 바뀌어 있어야 합니다.

## 시작 전 확인

step 11을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- `practice/team-note.md` 파일이 존재함

확인 명령:

```bash
git status
cat practice/team-note.md
```

## 작업 1. conflict용 브랜치 먼저 만들기

```bash
git switch -c branch/team-note-other
git switch main
```

이 순서가 중요합니다. 브랜치를 먼저 만들어야 `main`과 다른 브랜치가 같은 시작점에서 갈라집니다.

## 작업 2. main에서 team-note 문단 수정하기

### 입력할 내용

`practice/team-note.md`의 본문 문단을 다음처럼 바꿉니다.

```md
# Team Note

우리 팀은 main 브랜치에서 충돌 해결 기준을 먼저 정리합니다.

여러 줄을 비교하고 자연스러운 최종 문단으로 고치는 연습을 합니다.
```

### 예상 git diff

```bash
git diff -- practice/team-note.md
```

```diff
diff --git a/practice/team-note.md b/practice/team-note.md
index 9803f0b..efa1673 100644
--- a/practice/team-note.md
+++ b/practice/team-note.md
@@ -1,5 +1,5 @@
 # Team Note
 
-우리 팀은 문서 변경 내용을 천천히 확인합니다.
+우리 팀은 main 브랜치에서 충돌 해결 기준을 먼저 정리합니다.
 
-브랜치를 만들고, 내용을 수정하고, 다시 합치는 과정을 연습합니다.
+여러 줄을 비교하고 자연스러운 최종 문단으로 고치는 연습을 합니다.
```

### commit

```bash
git add practice/team-note.md
git commit -m "Edit team note on main"
```

## 작업 3. 다른 브랜치에서 같은 문단 수정하기

```bash
git switch branch/team-note-other
```

`practice/team-note.md` 본문을 다음처럼 바꿉니다.

```md
# Team Note

우리 팀은 충돌 연습 브랜치에서 문서 변경 내용을 함께 검토합니다.

여러 줄을 고친 뒤 필요한 문장만 남기는 연습을 합니다.
```

예상 diff:

```diff
diff --git a/practice/team-note.md b/practice/team-note.md
index 9803f0b..ac8d235 100644
--- a/practice/team-note.md
+++ b/practice/team-note.md
@@ -1,5 +1,5 @@
 # Team Note
 
-우리 팀은 문서 변경 내용을 천천히 확인합니다.
+우리 팀은 충돌 연습 브랜치에서 문서 변경 내용을 함께 검토합니다.
 
-브랜치를 만들고, 내용을 수정하고, 다시 합치는 과정을 연습합니다.
+여러 줄을 고친 뒤 필요한 문장만 남기는 연습을 합니다.
```

commit합니다.

```bash
git add practice/team-note.md
git commit -m "Edit team note on branch"
```

## 작업 4. main에서 merge해서 여러 줄 conflict 만들기

```bash
git switch main
git merge branch/team-note-other
```

예상 출력:

```text
Auto-merging practice/team-note.md
CONFLICT (content): Merge conflict in practice/team-note.md
Automatic merge failed; fix conflicts and then commit the result.
```

## 작업 5. conflict 영역 읽기

`practice/team-note.md`는 다음과 비슷하게 보입니다.

```md
# Team Note

<<<<<<< HEAD
우리 팀은 main 브랜치에서 충돌 해결 기준을 먼저 정리합니다.

여러 줄을 비교하고 자연스러운 최종 문단으로 고치는 연습을 합니다.
=======
우리 팀은 충돌 연습 브랜치에서 문서 변경 내용을 함께 검토합니다.

여러 줄을 고친 뒤 필요한 문장만 남기는 연습을 합니다.
>>>>>>> branch/team-note-other
```

한 줄 conflict보다 읽을 내용이 많습니다. 그래서 바로 버튼을 누르기보다 두 문단이 각각 어떤 말을 하려는지 먼저 읽습니다.

## 작업 6. 최종 문단 직접 작성하기

이번 실습에서는 두 내용을 합쳐 다음처럼 정리합니다.

```md
# Team Note

우리 팀은 main과 브랜치에서 고친 문단을 함께 검토합니다.

여러 줄을 비교하고 필요한 문장만 남겨 자연스러운 최종 문단으로 정리합니다.
```

`<<<<<<<`, `=======`, `>>>>>>>` 표시는 모두 삭제해야 합니다.

## 작업 7. 해결 후 diff 확인하기

```bash
git diff -- practice/team-note.md
```

예상 diff:

```diff
diff --git a/practice/team-note.md b/practice/team-note.md
index efa1673..cf1351b 100644
--- a/practice/team-note.md
+++ b/practice/team-note.md
@@ -1,5 +1,5 @@
 # Team Note
 
-우리 팀은 main 브랜치에서 충돌 해결 기준을 먼저 정리합니다.
+우리 팀은 main과 브랜치에서 고친 문단을 함께 검토합니다.
 
-여러 줄을 비교하고 자연스러운 최종 문단으로 고치는 연습을 합니다.
+여러 줄을 비교하고 필요한 문장만 남겨 자연스러운 최종 문단으로 정리합니다.
```

## 작업 8. 해결 commit 만들기

```bash
git add practice/team-note.md
git commit -m "Resolve team note conflict"
```

## 완료 기준

다음 조건을 만족하면 step 12가 완료된 것입니다.

- `practice/team-note.md`에 conflict marker가 없습니다.
- 최종 문단이 직접 정리한 문단입니다.
- `Resolve team note conflict` commit이 만들어졌습니다.
- Source Control 변경 목록이 비어 있습니다.

다음 단계에서는 지금까지 익힌 브랜치 생성, 수정, commit, merge 흐름을 반복합니다.
