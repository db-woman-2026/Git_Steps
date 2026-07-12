# Chapter 5. merge

## 핵심 생각

merge는 branch에서 만든 변경을 다른 branch에 합치는 작업입니다.

가장 흔한 흐름은 다음과 같습니다.

```text
1. branch를 만든다.
2. branch에서 파일을 수정하고 commit한다.
3. main으로 돌아온다.
4. branch를 main에 merge한다.
```

## 기본 명령 구조

작업 branch에서 commit을 만든 뒤 `main`으로 돌아옵니다.

```bash
git switch main
```

그 다음 branch를 합칩니다.

```bash
git merge branch/profile-edit
```

## 자동 merge되는 예시

`main`에서는 `intro.md`를 수정하고, 다른 branch에서는 `profile.md`를 수정했다고 가정합니다.

```text
main에서 수정:
  practice/intro.md

branch/profile-edit에서 수정:
  practice/profile.md
```

서로 다른 파일을 수정했기 때문에 Git이 자동으로 합칠 가능성이 높습니다.

merge 후에는 두 변경이 모두 들어 있습니다.

```text
practice/intro.md    main에서 수정한 내용 있음
practice/profile.md  branch에서 수정한 내용 있음
```

## 같은 파일이어도 자동 merge될 수 있음

같은 파일을 고쳐도 서로 멀리 떨어진 줄이면 자동 merge될 수 있습니다.

```md
# Profile

이름: 홍길동

좋아하는 도구: VSCode

오늘의 목표: Git branch 이해하기
```

한 branch는 `좋아하는 도구` 줄을 고치고, 다른 branch는 `오늘의 목표` 줄을 고치면 Git이 자동으로 합칠 수 있습니다.

## merge commit

상황에 따라 merge 결과로 새 commit이 생길 수 있습니다.

```text
A -- B ------ M
      \      /
       C -- D
```

`M`은 두 흐름을 합친 merge commit입니다.

## 정리

- merge는 branch의 변경을 다른 branch에 합치는 작업입니다.
- 서로 다른 파일을 고치면 자동 merge될 가능성이 높습니다.
- 같은 파일이어도 서로 떨어진 줄이면 자동 merge될 수 있습니다.
- Git이 자동으로 고르지 못하면 conflict가 납니다.
