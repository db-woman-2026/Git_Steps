# Git 기초 과정 계획

수정, stage, commit, branch, merge, conflict, push를 3회 수업으로 진행합니다. 명령을 외우기보다 명령 전후의 상태를 읽는 데 시간을 둡니다.

## 대상과 선수 지식

- 파일을 만들고 VS Code에서 저장할 수 있습니다.
- Windows Terminal의 PowerShell을 열고 현재 폴더를 확인할 수 있습니다.
- GitHub 계정을 사용할 수 있습니다.

Git을 처음 배워도 시작할 수 있습니다. 첫 수업 전에는 [Windows 11 환경 준비](./windows-11.md)와 [Git·GitHub·SSH 초기 설정](./lecture/requirements.md)을 진행합니다.

## 권장 시간

| 회차 | 단계 | 권장 시간 | 수업 내용 |
| --- | --- | ---: | --- |
| 1회차 | `step-0~5` | 180분 | 저장소 초기화, 수정, diff, stage, commit, 첫 branch와 merge |
| 2회차 | `step-6~10` | 180분 | 여러 branch, conflict 재현·중단·해결, JavaScript 모듈 시작 |
| 3회차 | `step-11~14` | 180분 | 코드 파일 modify/delete, 여러 줄 코드 conflict, 기능 branch, 최종 push |

수업마다 10분은 시작 상태 확인, 20분은 마지막 복구 실습에 사용합니다. `step-0`의 GitHub 저장소 생성과 첫 로그인은 네트워크 상태에 따라 시간이 더 필요할 수 있습니다.

## 반복할 상태 확인 순서

1. `git branch --show-current`로 현재 branch를 확인합니다.
2. `git status --short`로 working tree를 확인합니다.
3. 파일을 수정한 뒤 `git diff`를 읽습니다.
4. stage한 뒤 `git diff --staged`를 읽습니다.
5. commit 후 `git status`와 `git log --oneline -3`을 확인합니다.
6. merge 전에는 어느 branch가 어느 branch를 받는지 문장으로 적습니다.

## 회차별 평가

### 1회차

- untracked, modified, staged, committed 상태를 구분합니다.
- 작은 변경 하나를 stage하고 commit한 뒤 기록을 찾습니다.
- 작업 branch의 commit을 `main`에 merge합니다.

### 2회차

- 자동 merge와 conflict의 차이를 파일 위치로 설명합니다.
- conflict marker의 current와 incoming 내용을 구분합니다.
- 해결할 내용을 직접 정하고 marker를 제거한 뒤 commit합니다.

### 3회차

- 실제 JavaScript 모듈의 modify/delete conflict에서 파일을 남길지 삭제할지 설명합니다.
- 코드 실행으로 merge 결과를 확인합니다.
- `status → diff → stage → commit → merge → push` 순서를 도움 없이 수행합니다.
- 본인 원격 저장소에 push하고 로컬과 원격 commit을 확인합니다.

## 회복 기준

오류가 나면 새 명령을 연속해서 입력하지 않습니다. 현재 branch, `git status`, 직전에 실행한 명령, 변경 파일을 먼저 기록합니다. 해결 절차는 [문제 해결](./troubleshooting.md)에서 선택합니다.

공유 저장소에서는 `reset --hard`, 강제 push, `.git` 폴더 삭제를 기본 복구 방법으로 사용하지 않습니다. 현재 변경을 보존한 상태에서 원인을 확인하는 절차를 먼저 연습합니다.
