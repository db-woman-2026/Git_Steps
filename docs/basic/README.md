# Git 기초 개념

저장소, stage, commit, branch, merge의 기본 개념을 정리했습니다.

Windows 11에서 실습한다면 먼저 [Windows 11 환경 준비](../windows-11.md)를 확인합니다.

주제별 확인 결과는 [실습 구성](../course-plan.md), 오류 복구는 [문제 해결](../troubleshooting.md)에서 확인합니다.

Git은 파일의 변경 이력을 저장하고 작업 흐름을 나누거나 합치는 버전 관리 도구입니다. 각 명령을 실행한 뒤 Git 상태가 어떻게 바뀌는지 확인합니다.

## 문서 구성

| 순서 | 문서 | 내용 |
| --- | --- | --- |
| 1 | [chapter-1-repository.md](./chapter-1-repository.md) | 저장소, 작업 폴더, 파일 상태 |
| 2 | [chapter-2-status-stage-commit.md](./chapter-2-status-stage-commit.md) | status, stage, commit |
| 3 | [chapter-3-history-head.md](./chapter-3-history-head.md) | commit 이력과 HEAD |
| 4 | [chapter-4-branch.md](./chapter-4-branch.md) | branch의 의미와 구조 |
| 5 | [chapter-5-merge.md](./chapter-5-merge.md) | merge의 의미와 결과 |
| 6 | [chapter-6-conflict.md](./chapter-6-conflict.md) | conflict의 원인과 해결 원리 |
| 부록 | [glossary.md](./glossary.md) | Git 기본 용어 |

## 기본 흐름

```text
파일 변경 -> 변경 선택(stage) -> 기록(commit)
                                  -> 흐름 분리(branch)
                                  -> 흐름 합치기(merge)
```

Git의 기본은 다음 세 가지 질문으로 정리할 수 있습니다.

1. 어떤 파일이 바뀌었는가?
2. 어떤 변경을 하나의 기록으로 남길 것인가?
3. 나뉜 기록을 어떻게 합칠 것인가?

## 범위

여기에서는 repository, working tree, stage, commit, HEAD, branch, merge, conflict와 remote의 기본 의미를 다룹니다. rebase, stash, tag, revert와 복잡한 협업 방식은 다루지 않습니다.
