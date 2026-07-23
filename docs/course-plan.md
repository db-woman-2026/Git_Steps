# Git 실습 구성

수정, stage, commit, branch, merge, conflict, push를 다룹니다. 명령을 실행하기 전과 후의 저장소 상태를 비교합니다.

## 시작 조건

- 파일을 만들고 VS Code에서 저장할 수 있습니다.
- Windows Terminal의 PowerShell을 열고 현재 폴더를 확인할 수 있습니다.
- GitHub 계정을 사용할 수 있습니다.

Git을 처음 사용한다면 [Windows 11 환경 준비](./windows-11.md)와 [Git·GitHub·SSH 초기 설정](./lecture/requirements.md)을 먼저 확인합니다.

## 주제별 결과

| 단계 | 내용 | 확인 결과 |
| --- | --- | --- |
| `step-0~2` | 저장소 초기화, 수정, diff, stage, commit | working tree와 stage의 차이를 구분합니다. |
| `step-3~5` | branch 생성과 merge | branch별 변경과 merge 결과를 비교합니다. |
| `step-6~10` | 여러 branch와 conflict | conflict를 재현하고 중단하거나 해결합니다. |
| `step-11~14` | 코드 conflict와 기능 branch | 코드를 실행해 merge 결과를 확인하고 원격 저장소에 push합니다. |

## 반복할 상태 확인 순서

1. `git branch --show-current`로 현재 branch를 확인합니다.
2. `git status --short`로 working tree를 확인합니다.
3. 파일을 수정한 뒤 `git diff`를 읽습니다.
4. stage한 뒤 `git diff --staged`를 읽습니다.
5. commit 후 `git status`와 `git log --oneline -3`을 확인합니다.
6. merge 전에는 어느 branch가 어느 branch를 받는지 문장으로 적습니다.

## 이해 점검

### 저장소 상태와 첫 merge

- untracked, modified, staged, committed 상태를 구분합니다.
- 작은 변경 하나를 stage하고 commit한 뒤 기록을 찾습니다.
- 작업 branch의 commit을 `main`에 merge합니다.

### conflict

- 자동 merge와 conflict의 차이를 파일 위치로 설명합니다.
- conflict marker의 current와 incoming 내용을 구분합니다.
- 해결할 내용을 직접 정하고 marker를 제거한 뒤 commit합니다.

### 코드 변경과 원격 저장소

- 실제 JavaScript 모듈의 modify/delete conflict에서 파일을 남길지 삭제할지 설명합니다.
- 코드 실행으로 merge 결과를 확인합니다.
- `status → diff → stage → commit → merge → push` 순서를 도움 없이 수행합니다.
- 본인 원격 저장소에 push하고 로컬과 원격 commit을 확인합니다.

## 오류 대응

오류가 나면 새 명령을 연속해서 입력하지 않습니다. 현재 branch, `git status`, 직전에 실행한 명령, 변경 파일을 먼저 기록합니다. 해결 절차는 [문제 해결](./troubleshooting.md)에서 선택합니다.

공유 저장소에서는 `reset --hard`, 강제 push, `.git` 폴더 삭제를 기본 복구 방법으로 사용하지 않습니다. 현재 변경을 보존한 상태에서 원인을 확인하는 절차를 먼저 연습합니다.
