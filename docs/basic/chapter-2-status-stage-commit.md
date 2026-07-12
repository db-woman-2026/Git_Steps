# Chapter 2. status, stage, commit

## 핵심 생각

Git에서 파일을 저장한다는 말은 보통 commit을 만든다는 뜻입니다.

하지만 commit 전에 한 단계가 더 있습니다. 바로 stage입니다.

```text
파일 수정 -> stage -> commit
```

## status

`status`는 지금 Git이 보는 상태를 확인하는 명령입니다.

```bash
git status
```

예시:

```text
Changes not staged for commit:
  modified:   practice/intro.md

Untracked files:
  practice/today.md
```

이 예시는 두 가지를 보여줍니다.

| 표시 | 의미 |
| --- | --- |
| `modified` | Git이 이미 알던 파일이 수정됨 |
| `Untracked files` | Git이 아직 관리하지 않는 새 파일 |

## stage

stage는 "이번 commit에 넣을 변경을 고르는 공간"입니다.

```bash
git add practice/intro.md
```

여러 파일을 한 번에 stage할 수도 있습니다.

```bash
git add .
```

stage 후에는 상태가 이렇게 바뀝니다.

```text
Changes to be committed:
  modified:   practice/intro.md
```

VSCode에서는 파일이 Staged Changes 영역으로 이동합니다.

## commit

commit은 stage된 변경을 하나의 기록으로 저장합니다.

```bash
git commit -m "Update intro"
```

예상 출력:

```text
[main 3a2b1c4] Update intro
 1 file changed, 1 insertion(+)
```

commit 메시지는 "무엇을 바꿨는지" 짧게 적습니다.

## 작은 예시

수정 전:

```md
# Intro

안녕하세요.
```

수정 후:

```md
# Intro

안녕하세요.
Git을 배우고 있습니다.
```

Git이 보는 변화:

```diff
 # Intro
 
 안녕하세요.
+Git을 배우고 있습니다.
```

`+`는 새로 추가된 줄입니다.

## 정리

- `git status`는 현재 상태를 보여줍니다.
- stage는 이번 commit에 넣을 변경을 고르는 단계입니다.
- commit은 stage된 변경을 기록으로 저장합니다.
- VSCode Source Control에서도 같은 흐름을 버튼과 영역으로 보여줍니다.
