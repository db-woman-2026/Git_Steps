# 수업 전 초기 설정: Windows, Git, GitHub CLI, SSH

첫 수업 전에 Windows Terminal의 PowerShell에서 Git과 GitHub 연결을 준비합니다. 이 설정을 마치면 GitHub 비밀번호를 터미널에 입력하지 않고 SSH로 `clone`, `fetch`, `push`할 수 있습니다.

## 완료 상태

다음 네 가지를 확인하면 초기 설정이 끝난 것입니다.

- `git --version`과 `gh --version`이 버전을 출력합니다.
- `gh auth status --hostname github.com`에 사용할 GitHub 계정이 표시됩니다.
- `%USERPROFILE%\.ssh`에 개인 키와 공개 키가 있습니다.
- `ssh -T git@github.com`에 `successfully authenticated`가 표시됩니다.

## 1. 설치 전 확인

PowerShell을 열고 현재 사용할 수 있는 명령을 확인합니다.

```powershell
Get-Command winget -ErrorAction SilentlyContinue
Get-Command git -ErrorAction SilentlyContinue
Get-Command gh -ErrorAction SilentlyContinue
Get-Command ssh -ErrorAction SilentlyContinue
```

이미 설치된 프로그램은 다시 설치하지 않습니다. 이 문서는 Windows에 기본 포함된 OpenSSH의 `ssh`와 `ssh-keygen`을 사용합니다.

## 2. Git과 GitHub CLI 설치

`winget`을 사용할 수 있다면 다음 명령을 실행합니다.

```powershell
winget install --id Git.Git -e --source winget
winget install --id GitHub.cli -e --source winget
```

`winget`이 없다면 다음 공식 페이지에서 Windows x64 설치 파일을 받습니다.

- [Git for Windows 설치](https://git-scm.com/install/windows)
- [GitHub CLI Windows 설치](https://github.com/cli/cli/blob/trunk/docs/install_windows.md)
- [GitHub CLI 공식 릴리스](https://github.com/cli/cli/releases/latest)

Git은 `64-bit Git for Windows Setup` 실행 파일을 사용합니다. GitHub CLI는 파일명이 `gh_..._windows_amd64.msi`인 MSI를 사용합니다. ARM 기반 Windows라면 x64 대신 ARM64 설치 파일을 선택합니다.

내려받은 파일을 실행하기 전에는 파일의 디지털 서명을 확인할 수 있습니다. 아래 경로와 파일명은 실제 다운로드한 파일에 맞게 바꿉니다.

```powershell
Get-AuthenticodeSignature "$env:USERPROFILE\Downloads\Git-버전-64-bit.exe"
Get-AuthenticodeSignature "$env:USERPROFILE\Downloads\gh_버전_windows_amd64.msi"
```

두 결과의 `Status`가 `Valid`인지 확인합니다. 설치가 끝나면 Windows Terminal 창을 모두 닫고 새 창을 연 뒤 버전을 확인합니다. 새 탭만 열면 변경된 `PATH`가 반영되지 않을 수 있습니다.

```powershell
git --version
gh --version
ssh -V
Get-Command git
Get-Command gh
```

## 3. commit 작성자 설정

GitHub 로그인 계정과 commit 작성자 정보는 서로 다른 설정입니다. GitHub 계정에 등록한 이름과 이메일을 사용하되, 아래 예시는 본인 정보로 바꿉니다.

```powershell
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
git config --global --get user.name
git config --global --get user.email
```

공용 PC에서는 전역 설정 대신 실습 저장소에서 `--global`을 뺀 명령을 사용합니다. GitHub에서 이메일을 숨기고 싶다면 GitHub가 제공하는 `noreply` 이메일을 commit 이메일로 사용할 수 있습니다.

## 4. 기존 SSH 키 확인

새 키를 만들기 전에 기존 파일을 확인합니다.

```powershell
$sshDirectory = Join-Path $env:USERPROFILE '.ssh'
if (Test-Path $sshDirectory) {
    Get-ChildItem $sshDirectory -Force
} else {
    Write-Output '아직 .ssh 폴더가 없습니다.'
}
```

`id_ed25519`와 `id_ed25519.pub`가 이미 있다면 덮어쓰지 않습니다. 기존 키를 계속 쓸지 새 이름의 키를 만들지는 강사 또는 PC 관리자와 먼저 확인합니다.

## 5. ED25519 SSH 키 만들기

아래 이메일을 GitHub 계정에 등록한 본인 이메일로 바꿉니다.

```powershell
ssh-keygen -t ed25519 -C "student@example.com"
```

저장 위치 질문에는 Enter를 눌러 기본 경로인 `C:\Users\사용자명\.ssh\id_ed25519`을 사용합니다. 기존 파일을 덮어쓸지 묻는다면 `n`을 입력하고 중단합니다.

이어서 SSH 키 암호 문구를 입력합니다. 개인 키가 유출됐을 때 바로 사용되지 않도록 개인 PC에서도 암호 문구를 설정하는 편이 안전합니다. 암호 문구 없이 쓰려면 두 번 Enter를 누르지만, 공용 PC에서는 암호 문구 없는 개인 키를 만들지 않습니다.

생성된 두 파일의 역할은 다릅니다.

- `id_ed25519`: 개인 키입니다. GitHub, 메신저, 문서에 올리거나 다른 사람에게 보내지 않습니다.
- `id_ed25519.pub`: 공개 키입니다. 이 파일만 GitHub 계정에 등록합니다.

공개 키의 지문과 내용을 확인합니다.

```powershell
ssh-keygen -lf "$env:USERPROFILE\.ssh\id_ed25519.pub"
Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

암호 문구를 나중에 추가하거나 바꾸려면 다음 명령을 실행합니다.

```powershell
ssh-keygen -p -f "$env:USERPROFILE\.ssh\id_ed25519"
```

## 6. GitHub CLI로 로그인

다음 명령은 GitHub 웹 로그인을 열고 Git 작업 프로토콜을 SSH로 설정합니다. `admin:public_key`는 다음 단계에서 공개 키를 GitHub 계정에 등록하는 데 필요한 권한입니다.

```powershell
gh auth login --hostname github.com --git-protocol ssh --web --skip-ssh-key --scopes admin:public_key
```

브라우저가 열리면 사용할 GitHub 계정으로 로그인하고 일회용 코드와 권한 요청을 승인합니다. 이메일 주소는 commit 정보이며, CLI에는 그 이메일이 연결된 GitHub 사용자 계정으로 로그인합니다. GitHub 비밀번호나 인증 토큰을 PowerShell 명령에 직접 적지 않습니다.

로그인 결과를 확인합니다.

```powershell
gh auth status --hostname github.com
```

출력의 `Logged in to github.com account` 뒤에 본인 GitHub 사용자명이 보여야 합니다. `--show-token` 옵션은 화면에 인증 토큰을 노출하므로 수업 중 사용하지 않습니다.

## 7. 공개 키를 GitHub에 등록

키 제목에는 나중에 어느 PC의 키인지 알 수 있도록 컴퓨터 이름과 날짜를 넣습니다.

```powershell
$sshKeyTitle = "$env:COMPUTERNAME-$(Get-Date -Format yyyy-MM-dd)"
gh ssh-key add "$env:USERPROFILE\.ssh\id_ed25519.pub" --title $sshKeyTitle
```

`Public key added to your account`가 표시되면 등록됐습니다. 등록된 인증 키의 제목은 다음 명령으로 확인할 수 있습니다.

```powershell
gh api user/keys --jq '.[].title'
```

`admin:public_key` 권한이 필요하다는 오류가 나오면 추가 권한을 승인한 뒤 등록 명령을 다시 실행합니다.

```powershell
gh auth refresh --hostname github.com --scopes admin:public_key
```

## 8. SSH 연결 테스트

GitHub에 SSH 인증을 시도합니다.

```powershell
ssh -T git@github.com
```

처음 연결할 때 GitHub 호스트를 신뢰할지 물을 수 있습니다. [GitHub가 공개한 SSH 키 지문](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)과 화면의 지문을 비교한 뒤 일치하면 `yes`를 입력합니다.

다음과 같은 문장이 나오면 성공입니다.

```text
Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
```

GitHub는 일반 SSH 셸을 제공하지 않으므로 위 성공 문장 뒤 명령 종료 코드가 `1`이어도 정상입니다. `USERNAME`이 본인 계정인지 확인합니다.

## 9. SSH 주소로 저장소 연결

GitHub 저장소 페이지에서 `Code` 버튼, `SSH` 탭을 차례로 선택하면 다음 형식의 주소가 보입니다.

```text
git@github.com:my-account/git-steps-practice.git
```

새 원격 저장소를 연결할 때 이 주소를 사용합니다.

```powershell
git remote add origin git@github.com:my-account/git-steps-practice.git
git remote -v
```

이미 `origin`이 HTTPS 주소로 등록돼 있다면 SSH 주소로 바꿉니다.

```powershell
git remote set-url origin git@github.com:my-account/git-steps-practice.git
git remote -v
```

`my-account`와 저장소 이름은 반드시 본인 값으로 바꿉니다.

## 10. 수업 시작 전 최종 확인

새 PowerShell 창에서 다음 명령을 차례로 실행합니다.

```powershell
git --version
gh --version
git config --global --get user.name
git config --global --get user.email
gh auth status --hostname github.com
ssh -T git@github.com
```

설치 명령을 찾지 못하면 Windows Terminal 창을 모두 닫고 새로 엽니다. SSH 인증이 실패하면 공개 키가 로그인한 GitHub 계정에 등록됐는지, 개인 키 파일명이 등록한 공개 키와 짝을 이루는지 확인한 뒤 [문제 해결](../troubleshooting.md)을 봅니다.

## 공용 PC 정리

공용 PC에서는 수업이 끝난 뒤 개인 키와 로그인 정보를 그대로 남기지 않습니다. 삭제하기 전에 경로가 본인 Windows 사용자 폴더인지 확인하고 강사 또는 PC 관리자의 정리 지침을 따릅니다.

```powershell
gh auth logout --hostname github.com
git config --global --unset user.name
git config --global --unset user.email
```

GitHub 웹사이트의 `Settings > SSH and GPG keys`에서도 해당 PC의 공개 키를 삭제합니다. 개인 키 파일 삭제는 되돌리기 어려우므로 다른 저장소나 서비스에서 같은 키를 쓰는지 확인한 뒤 진행합니다.

## 공식 안내

- [Git for Windows 설치](https://git-scm.com/install/windows)
- [GitHub CLI Windows 설치](https://github.com/cli/cli/blob/trunk/docs/install_windows.md)
- [`gh auth login` 설명](https://cli.github.com/manual/gh_auth_login)
- [`gh ssh-key add` 설명](https://cli.github.com/manual/gh_ssh-key_add)
- [GitHub SSH 키 생성 안내](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub 계정에 SSH 키 추가](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [GitHub SSH 연결 테스트](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)
