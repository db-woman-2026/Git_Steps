# Lecture Index

이 폴더는 `Git_Steps`의 실습형 강의 자료입니다.

각 문서는 수강생이 이전 단계 결과에서 현재 단계로 넘어오며 직접 수행할 Git 작업을 기능 단위로 나눕니다. 파일을 수정하는 단계에서는 commit 전에 보게 될 예상 `git diff`를 함께 제공합니다.

## 강의 목록

| 단계 | 강의 자료 | 요약 |
| --- | --- | --- |
| `step-0` | [lecture/step-0.md](./step-0.md) | Git 저장소를 초기화하고 첫 commit을 만든 뒤 GitHub에 최초 push합니다. |
| `step-1` | [lecture/step-1.md](./step-1.md) | `practice/intro.md`에 문장을 추가하고 첫 파일 수정 commit을 만듭니다. |
| `step-2` | [lecture/step-2.md](./step-2.md) | `practice/profile.md`를 수정하고 Git diff에서 바뀐 줄을 읽습니다. |
| `step-3` | [lecture/step-3.md](./step-3.md) | 첫 브랜치를 만들고 브랜치 안에서만 보이는 변경을 commit합니다. |
| `step-4` | [lecture/step-4.md](./step-4.md) | `branch/profile-edit`의 변경을 `main`에 충돌 없이 merge합니다. |

## 실습 방식

1. 각 단계는 이전 단계 실습을 끝낸 상태에서 시작합니다.
2. VSCode 왼쪽 Source Control 화면에서 변경 파일, stage 상태, commit 상태를 확인합니다.
3. `step-0`은 이전 변경 기준이 없으므로 `git status` 중심으로 확인합니다.
4. `step-1`부터 문서의 예상 diff는 수강생 저장소에서 commit 전에 `git diff`를 실행했을 때 보게 되는 기준입니다.
5. `+` 줄은 새로 추가되거나 바뀐 내용이고, `-` 줄은 사라지거나 교체되는 내용입니다.
6. commit 후에는 Source Control 변경 목록이 비어 있어야 합니다.
7. conflict 단계에서는 Git이 자동으로 고르지 못한 내용을 사람이 직접 결정합니다.
