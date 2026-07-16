# Chapter 4. branch

## branch의 의미

**branch**는 특정 commit을 가리키는 이름입니다. 새로운 commit이 생기면 현재 branch는 그 commit을 가리키도록 이동합니다.

```text
A -> B
     ^
     main
```

`main`은 기본 branch에 흔히 사용하는 이름입니다.

## branch를 나누는 이유

branch를 사용하면 같은 이력에서 서로 다른 변경 흐름을 만들 수 있습니다. 한 흐름의 변경은 합치기 전까지 다른 흐름에 영향을 주지 않습니다.

새 branch가 만들어진 직후에는 두 branch가 같은 commit을 가리킵니다.

```text
A -> B
     ^
     main
     topic
```

`topic` branch에서 새 commit을 만들면 가리키는 위치가 달라집니다.

```text
A -> B
     ^ \
     main C
          ^
          topic
```

## branch 만들기와 이동

새 branch를 만들면서 이동하는 명령은 다음과 같습니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```bash
git switch -c topic
```

기존 branch로 이동할 때는 branch 이름만 지정합니다.

```bash
git switch main
```

현재 branch 목록은 다음 명령으로 확인할 수 있습니다.

```bash
git branch
```

```text
* topic
  main
```

`*`는 현재 선택된 branch를 표시합니다.

## branch와 HEAD

HEAD는 보통 현재 branch를 가리키고, branch는 최신 commit을 가리킵니다.

```text
HEAD -> topic -> commit C
```

branch를 바꾸면 HEAD가 다른 branch를 가리키며, 작업 폴더도 그 branch의 파일 상태에 맞게 바뀝니다.

## 정리

- branch는 특정 commit을 가리키는 이름입니다.
- branch를 나누면 독립적인 변경 흐름을 만들 수 있습니다.
- 현재 branch에서 commit을 만들면 그 branch가 새 commit으로 이동합니다.
- HEAD는 보통 현재 선택된 branch를 가리킵니다.
