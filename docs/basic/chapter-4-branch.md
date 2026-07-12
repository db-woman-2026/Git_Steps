# Chapter 4. branch

## 핵심 생각

branch는 작업 흐름을 나누는 이름입니다.

처음에는 `main`이라는 기본 흐름 하나만 있다고 생각하면 됩니다.

```text
main: 첫 commit -> intro 수정 commit
```

새 branch를 만들면 기존 기록 위에서 다른 작업을 따로 해볼 수 있습니다.

## branch가 필요한 이유

예를 들어 `profile.md`를 고쳐보고 싶은데, 바로 `main`에 섞고 싶지 않을 수 있습니다.

이때 새 branch를 만듭니다.

```bash
git switch -c branch/profile-edit
```

이 명령은 새 branch를 만들고 그 branch로 이동합니다.

## branch 구조 예시

처음 상태:

```text
main
  |
  v
A -- B
```

새 branch를 만든 직후:

```text
main
  |
  v
A -- B
     ^
     |
branch/profile-edit
```

branch에서 commit을 만들면 흐름이 나뉩니다.

```text
main
  |
  v
A -- B
      \
       C
       ^
       |
branch/profile-edit
```

## 현재 branch 확인

```bash
git branch
```

예시:

```text
* branch/profile-edit
  main
```

`*`가 붙은 곳이 현재 branch입니다.

## VSCode에서 볼 것

VSCode 왼쪽 아래 또는 Source Control 주변에서 현재 branch 이름을 볼 수 있습니다.

예시:

```text
branch/profile-edit
```

branch를 바꾸면 열려 있는 파일 내용도 달라질 수 있습니다. Git이 "현재 branch의 파일 상태"를 보여주기 때문입니다.

## 정리

- branch는 작업 흐름의 이름입니다.
- 새 branch를 만들면 기존 commit 위에서 다른 작업을 해볼 수 있습니다.
- `git branch`에서 `*`가 현재 branch를 뜻합니다.
- branch에서 만든 commit은 merge하기 전까지 main에 섞이지 않습니다.
