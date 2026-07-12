# Chapter 3. commit 기록과 HEAD

## 핵심 생각

commit은 Git의 저장 지점입니다. 여러 commit이 쌓이면 프로젝트의 기록이 됩니다.

```text
첫 commit -> 두 번째 commit -> 세 번째 commit
```

## commit 기록 보기

간단한 기록은 다음 명령으로 볼 수 있습니다.

```bash
git log --oneline
```

예시:

```text
9f23f22 Update profile
3a2b1c4 Update intro
ea10cb3 Initialize Git learning project
```

위에 있을수록 최신 commit입니다.

## commit 하나가 담는 것

commit은 보통 다음 정보를 가집니다.

```text
commit id: 9f23f22
message: Update profile
changed files:
  practice/profile.md
```

처음에는 commit id를 외울 필요가 없습니다. "각 commit에는 고유한 이름표가 있다" 정도로 이해하면 됩니다.

## HEAD

`HEAD`는 지금 내가 보고 있는 최신 위치를 뜻합니다.

```text
ea10cb3 -> 3a2b1c4 -> 9f23f22
                         ^
                        HEAD
```

보통은 현재 브랜치의 가장 최신 commit을 가리킵니다.

## branch와 함께 볼 때

`main` 브랜치에서 최신 commit이 `9f23f22`라면 다음처럼 생각할 수 있습니다.

```text
main
  |
  v
9f23f22 Update profile
```

내가 `main`에 있고 최신 commit을 보고 있다면 `HEAD`도 같은 곳에 있습니다.

```text
main
  |
  v
9f23f22
  ^
 HEAD
```

## 정리

- commit은 Git의 저장 지점입니다.
- commit이 쌓이면 프로젝트 기록이 됩니다.
- `git log --oneline`으로 짧은 기록을 볼 수 있습니다.
- `HEAD`는 현재 내가 보고 있는 위치입니다.
