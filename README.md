# Git_Steps

`Git_Steps`는 Git을 처음 배우는 비개발자와 초급자를 위한 아주 작은 실습 프로젝트입니다.

이 저장소의 목표는 복잡한 개발 협업을 배우는 것이 아닙니다. 문서 파일을 조금씩 고치면서 Git이 변경 내용을 어떻게 보여주고, 어떻게 저장하고, 브랜치를 어떻게 합치고, conflict를 어떻게 해결하는지 VSCode 기준으로 익히는 것입니다.

## Project Purpose

`Git_Steps`는 하나의 완성 앱이 아니라 단계별 Git 실습 커리큘럼입니다.

수강생은 starter 파일이 있는 일반 폴더에서 시작해 다음 흐름을 직접 경험합니다.

```text
git init -> 첫 commit -> GitHub 최초 push -> 파일 수정 commit -> branch -> merge -> conflict 해결 -> 최종 push
```

수업에서는 명령어를 모두 외우는 것보다 VSCode Source Control 화면에서 변경 파일, stage, commit, branch, merge, conflict 상태를 눈으로 확인하는 데 집중합니다.

## main 브랜치의 역할

`main` 브랜치는 수업을 시작하는 starter 상태입니다.

이 브랜치에는 다음 내용만 들어 있습니다.

- 프로젝트 소개 README
- 실습에 사용할 Markdown 파일
- 단계별 개요 문서가 들어갈 `docs/overview` 폴더

실제 단계 문서는 `step-0`, `step-1`, `step-2`처럼 별도 브랜치에 누적됩니다.

## Branch Structure

- `main`: Git 실습 프로젝트의 starter 파일
- `step-0`: 로컬 Git 저장소 초기화, 첫 commit, GitHub remote 연결, `main` 최초 push
- `step-1` to `step-14`: Git 기초 기능과 상황별 branch, merge, conflict 실습

브랜치는 독립적인 예제 복사본이 아니라 부모-자식 관계를 가진 누적형 학습 이력입니다. 학습 흐름은 `main -> step-0 -> step-1 -> step-2 -> ... -> step-14` 순서이며, `step-1`은 `step-0` 위에 있고 `step-2`는 `step-1` 위에 있습니다.

향후 작업할 때도 이 관계를 전제로 해야 합니다. 특정 단계에 속한 수정은 가장 이른 affected step에서 먼저 고치고, 뒤 step으로 순서대로 merge해서 전파합니다. 중간 step을 건너뛰어 별도 커밋을 만들면 교육용 브랜치의 부모-자식 관계가 깨질 수 있습니다.

브랜치 체인은 다음 조건을 유지해야 합니다.

```bash
git merge-base --is-ancestor step-N step-(N+1)
```

`step-0 -> step-1` 관계도 같은 방식으로 유지합니다.

## Documentation Layout

- `README.md`: 프로젝트 목적, 브랜치 구조, 문서 구조, 커리큘럼 운영 기준
- `docs/overview/`: 짧은 단계별 개요 문서
- `docs/lecture/README.md`: 현재 step 브랜치에서 볼 수 있는 강의 목록과 실습 방식
- `docs/lecture/step-N.md`: 수강생이 그대로 따라 할 수 있는 상세 강의 자료
- `practice/`: 실습에 사용할 간단한 Markdown 파일

각 step 브랜치는 해당 단계까지의 강의 자료만 포함합니다.

예를 들어 `step-7`에는 `docs/lecture/README.md`와 `step-0`부터 `step-7`까지의 lecture 문서만 들어 있고, `step-8` 이후 문서는 들어 있지 않습니다.

## Practice Files

- `practice/intro.md`: 자기소개 문장 수정과 첫 conflict 실습
- `practice/profile.md`: 프로필 수정, branch, merge 실습
- `practice/goal.md`: 직접 문장 정리 conflict 실습
- `practice/memo.md`: 수정/삭제 conflict 실습
- `practice/team-note.md`: 여러 줄 conflict 실습

## Curriculum Scope

포함하는 내용:

- Git 저장소 초기화
- GitHub remote 연결과 최초 push
- 변경 파일 확인
- stage와 commit
- 간단한 commit 기록 확인
- branch 생성
- branch merge
- conflict 생성과 해결
- 최종 결과 push

제외하는 내용:

- stash
- tag
- revert
- reset 세부 설명
- rebase
- 협업 workflow
- pull conflict
- Git 내부 구조

## Steps

- `step-0`: Git 초기화, 첫 commit, GitHub 연결, 최초 push
- `step-1`: 첫 파일 수정 commit
- `step-2`: 변경 내용 비교
- `step-3`: 첫 branch 생성
- `step-4`: conflict 없는 branch merge
- `step-5`: 새 파일을 추가한 branch merge
- `step-6`: 서로 다른 파일을 수정한 branch merge
- `step-7`: 같은 파일의 떨어진 위치를 수정한 branch merge
- `step-8`: 첫 conflict 만들기
- `step-9`: VSCode 버튼으로 conflict 해결
- `step-10`: 직접 문장을 고쳐 conflict 해결
- `step-11`: 수정/삭제 conflict 해결
- `step-12`: 여러 줄 conflict 해결
- `step-13`: branch 생성과 merge 반복
- `step-14`: 최종 실습 결과 GitHub push

## Operational Notes

- 초급자 기준을 유지합니다.
- 명령어 설명보다 VSCode Source Control에서 보이는 상태를 우선합니다.
- 실습 파일은 Markdown만 사용해 안전하게 수정할 수 있게 합니다.
- 이전 step을 고치면 가장 이른 step에서 수정하고 뒤 step으로 merge 전파합니다.
