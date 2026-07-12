# Chapter 6. conflict

## 핵심 생각

conflict는 Git이 자동으로 하나를 고를 수 없는 상황입니다.

보통 두 branch가 같은 파일의 같은 부분을 다르게 고쳤을 때 생깁니다.

## conflict가 생기는 예시

처음 파일:

```md
# Intro

오늘 Git을 배웁니다.
```

`main`에서 수정:

```md
# Intro

오늘 Git의 commit을 배웁니다.
```

다른 branch에서 수정:

```md
# Intro

오늘 Git의 branch를 배웁니다.
```

둘 다 같은 줄을 다르게 바꿨기 때문에 Git은 어느 쪽을 선택해야 할지 모릅니다.

## conflict 표시

merge 중 conflict가 나면 파일 안에 다음과 비슷한 표시가 생길 수 있습니다.

```md
# Intro

<<<<<<< HEAD
오늘 Git의 commit을 배웁니다.
=======
오늘 Git의 branch를 배웁니다.
>>>>>>> branch/intro-edit
```

표시의 의미는 다음과 같습니다.

| 표시 | 의미 |
| --- | --- |
| `<<<<<<< HEAD` | 현재 branch 쪽 내용 시작 |
| `=======` | 두 내용의 구분선 |
| `>>>>>>> branch/intro-edit` | merge로 들어오는 branch 쪽 내용 끝 |

## 사람이 해야 할 일

conflict가 나면 사람이 최종 문장을 결정해야 합니다.

예를 들어 두 내용을 합쳐서 다음처럼 고칠 수 있습니다.

```md
# Intro

오늘 Git의 commit과 branch를 배웁니다.
```

중요한 점은 conflict 표시를 모두 지우는 것입니다.

```text
지워야 하는 표시:
<<<<<<< HEAD
=======
>>>>>>> branch/intro-edit
```

## VSCode에서 볼 것

VSCode는 conflict 파일 위에 선택 버튼을 보여줄 수 있습니다.

```text
Accept Current Change
Accept Incoming Change
Accept Both Changes
Compare Changes
```

처음에는 버튼 이름을 이렇게 이해하면 됩니다.

| 버튼 | 쉬운 의미 |
| --- | --- |
| Current | 현재 branch 내용 선택 |
| Incoming | merge로 들어오는 branch 내용 선택 |
| Both | 두 내용을 모두 남김 |
| Compare | 두 내용을 비교 |

## 정리

- conflict는 Git이 자동으로 고를 수 없는 상황입니다.
- 같은 줄을 서로 다르게 고치면 conflict가 날 수 있습니다.
- conflict 표시는 최종 파일에 남기면 안 됩니다.
- 해결 후에는 파일을 stage하고 conflict 해결 commit을 만듭니다.
