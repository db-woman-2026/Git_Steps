# Git Basic README

이 폴더는 `/docs/lecture` 실습을 시작하기 전에 읽는 기초 자료입니다.

목표는 Git을 깊게 이해하는 것이 아닙니다. 수강생이 VSCode Source Control 화면에서 보게 될 단어와 구조를 미리 익혀서, 이후 실습에서 당황하지 않게 만드는 것입니다.

## 학습 순서

| 순서 | 문서 | 내용 |
| --- | --- | --- |
| 1 | [chapter-1-repository.md](./chapter-1-repository.md) | Git 저장소, 작업 폴더, 파일 변경의 기본 구조 |
| 2 | [chapter-2-status-stage-commit.md](./chapter-2-status-stage-commit.md) | status, stage, commit의 의미 |
| 3 | [chapter-3-history-head.md](./chapter-3-history-head.md) | commit 기록, 최신 위치, HEAD |
| 4 | [chapter-4-branch.md](./chapter-4-branch.md) | branch가 왜 필요한지와 어떻게 생겼는지 |
| 5 | [chapter-5-merge.md](./chapter-5-merge.md) | merge가 하는 일과 자동 merge되는 상황 |
| 6 | [chapter-6-conflict.md](./chapter-6-conflict.md) | conflict가 생기는 이유와 표시 읽기 |
| 부록 | [glossary.md](./glossary.md) | 초급 Git 용어 정리 |

## 읽는 방법

1. 명령어를 외우려고 하지 않습니다.
2. 코드 블록을 보며 "Git이 어떤 상태를 보여주는지"에 집중합니다.
3. 모르는 단어는 [glossary.md](./glossary.md)에서 확인합니다.
4. 이 자료를 읽은 뒤 강의 step 브랜치의 `/docs/lecture/step-0.md`부터 실제 실습을 시작합니다.

## 이 자료에서 다루지 않는 것

- 여러 사람이 동시에 작업하는 협업 방식
- rebase, stash, tag, revert
- Git 내부 동작 원리
- 복잡한 명령어 옵션

처음에는 Git을 "변경 내용을 저장하고, 다른 흐름을 만들고, 다시 합치는 도구" 정도로 이해하면 충분합니다.
