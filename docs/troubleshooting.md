# Git 실습 문제 해결

오류가 나면 먼저 다음 네 줄을 실행하고 결과를 보관합니다.

> Windows 11에서는 [환경 준비](./windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```bash
git branch --show-current
git status
git remote -v
git log --oneline --decorate -3
```

PowerShell에서도 같은 명령을 사용합니다.

## commit에서 이름과 이메일을 요구합니다

`Author identity unknown` 또는 `Please tell me who you are`가 나오면 사용자 정보를 확인합니다.

```bash
git config --global --get user.name
git config --global --get user.email
```

값이 없다면 본인 정보로 설정합니다. 공식 Git 문서도 첫 commit 전에 이 설정을 확인하도록 안내합니다.

```bash
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
```

공용 PC에서는 강사 지침에 따라 저장소 안에만 설정하거나 수업 뒤 전역 설정을 정리합니다.

## branch를 이동할 수 없습니다

`Your local changes ... would be overwritten`가 나오면 현재 변경을 먼저 확인합니다.

```bash
git status --short
git diff
```

변경이 필요한 작업이면 commit합니다. 실수로 바꾼 파일이라면 파일별 복구 여부를 강사와 확인합니다. 내용을 확인하지 않고 `reset --hard`를 실행하지 않습니다.

## merge가 끝나지 않습니다

`git status`에서 `both modified`, `deleted by us`, `deleted by them`을 확인합니다. 파일을 수정하거나 삭제 여부를 결정한 뒤 stage합니다.

```bash
git add practice/파일명.md
git status
git commit
```

이번 merge 자체를 취소하고 시작 전 상태로 돌아가려면 conflict 파일을 임의로 지우기 전에 다음 명령을 사용합니다.

```bash
git merge --abort
git status
```

## push할 때 SSH 인증이 실패합니다

먼저 원격 저장소가 SSH 주소인지 확인합니다.

```bash
git remote -v
```

SSH 주소는 `git@github.com:계정명/저장소명.git` 형식입니다. HTTPS 주소가 등록돼 있다면 본인 저장소의 SSH 주소로 바꿉니다.

```bash
git remote set-url origin git@github.com:my-account/git-steps-practice.git
```

GitHub CLI 로그인과 SSH 연결을 따로 확인합니다.

```powershell
gh auth status --hostname github.com
ssh -T git@github.com
```

`Permission denied (publickey)`가 나오면 공개 키가 현재 로그인한 GitHub 계정에 등록됐는지 확인합니다. 설치부터 다시 진행하지 말고 [수업 전 초기 설정](./lecture/requirements.md)의 기존 키 확인, 공개 키 등록, SSH 연결 테스트를 차례로 다시 확인합니다.

## push가 rejected 됩니다

`non-fast-forward` 또는 `fetch first`가 나오면 원격에 로컬에 없는 commit이 있다는 뜻입니다. 바로 강제 push하지 않습니다.

```bash
git fetch origin
git log --oneline --left-right main...origin/main
```

수업 중 GitHub에서 README를 만들었는지, 다른 PC에서 push했는지 확인한 뒤 강사와 pull 또는 merge 방향을 결정합니다. `--force`는 이 과정의 복구 명령으로 사용하지 않습니다.

## 복구 후 확인

문제를 해결한 뒤에는 다음 세 가지를 다시 확인합니다.

```bash
git status
git branch --show-current
git log --oneline --decorate -3
```

현재 branch, 남은 변경, 마지막 commit을 설명할 수 있으면 다음 단계로 이동합니다.
