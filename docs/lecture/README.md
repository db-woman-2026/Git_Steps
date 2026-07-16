# Git 단계별 실습

단계별 Git 실습 자료입니다.

각 문서는 Git 작업을 기능 단위로 나눕니다. `step-1`부터는 commit 전의 예상 `git diff`도 함께 제시합니다.

## 강의 목록

- [과정 계획](../course-plan.md): 권장 시간, 선수 지식, 단계 묶음, 평가 기준
- [문제 해결](../troubleshooting.md): 사용자 정보, branch 이동, merge, push 오류 복구

| 단계 | 강의 자료 | 요약 |
| --- | --- | --- |
| `step-0` | [lecture/step-0.md](./step-0.md) | Git 저장소를 초기화하고 첫 commit을 만든 뒤 GitHub에 최초 push합니다. |

## 실습 방식

1. 각 단계는 이전 단계 실습을 끝낸 상태에서 시작합니다.
2. VSCode 왼쪽 Source Control 화면에서 변경 파일, stage 상태, commit 상태를 확인합니다.
3. `step-0`은 이전 변경 기준이 없으므로 `git status` 중심으로 확인합니다.
4. `step-1`부터 문서의 예상 diff는 수강생 저장소에서 commit 전에 `git diff`를 실행했을 때 보게 되는 기준입니다.
5. `+` 줄은 새로 추가되거나 바뀐 내용이고, `-` 줄은 사라지거나 교체되는 내용입니다.
6. commit 후에는 Source Control 변경 목록이 비어 있어야 합니다.
7. conflict 단계에서는 Git이 자동으로 고르지 못한 내용을 사람이 직접 결정합니다.

## 강사용 브랜치와 수강생 저장소

`step-N`은 강의 자료와 단계별 기준 상태를 보관하는 강사용 브랜치입니다. 수강생은 `step-0`에서 만든 개인 저장소의 `main`에서 실습합니다. 문서에 `branch/profile-edit` 같은 이름이 나오면 수강생 저장소 안에서 직접 만드는 연습 branch입니다.

강사용 저장소를 clone한 뒤 그 안에서 `git init`을 다시 실행하지 않습니다. `step-0`은 `.git`이 빠진 starter 압축 파일 또는 별도 실습 폴더에서 시작합니다.
