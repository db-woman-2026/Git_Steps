# Chapter 5. merge

## merge의 의미

**merge**는 나뉜 branch의 이력을 하나로 합치는 기능입니다.

```text
A -> B --------
     \          \
      C -> D ----M
```

`M`은 두 흐름을 함께 이어 주는 merge commit입니다.

## merge의 방향

merge는 현재 branch를 기준으로 동작합니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```bash
git switch main
git merge topic
```

이 명령은 `topic`의 변경을 현재 branch인 `main`에 합친다는 뜻입니다.

```text
현재 branch <- 합칠 branch
main           topic
```

## fast-forward merge

branch가 나뉜 뒤 `main`에 새 commit이 없다면, `main`의 위치만 앞으로 이동해도 이력이 합쳐집니다. 이를 **fast-forward merge**라고 합니다.

merge 전:

```text
A -> B -> C
     ^    ^
     main topic
```

merge 후:

```text
A -> B -> C
          ^
          main
          topic
```

이 경우 별도의 merge commit이 필요하지 않습니다.

## merge commit

두 branch 모두에 새로운 commit이 있다면 Git은 두 흐름을 연결하는 merge commit을 만들 수 있습니다.

merge 전:

```text
A -> B -> C
     \    ^
      D   main
      ^
      topic
```

merge 후:

```text
A -> B -> C -> M
     \        /
      D ------
               ^
               main
```

## 자동으로 합쳐지는 경우

Git은 변경 위치가 겹치지 않으면 내용을 자동으로 합칠 수 있습니다.

```text
main:  notes.txt 수정
topic: profile.md 수정
```

같은 파일이라도 서로 떨어진 부분을 수정했다면 자동 merge가 가능할 수 있습니다.

```text
main:  document.md의 첫 문단 수정
topic: document.md의 마지막 문단 수정
```

반대로 같은 부분의 내용이 서로 다르면 conflict가 발생할 수 있습니다.

## 정리

- merge는 나뉜 branch 이력을 합칩니다.
- merge는 현재 branch에 다른 branch를 가져오는 방향으로 동작합니다.
- 현재 branch의 위치만 이동하면 되는 경우를 fast-forward merge라고 합니다.
- 나뉜 두 이력을 연결하기 위해 merge commit이 생길 수 있습니다.
