# 수업 전 초기 설정: Windows, Git, GitHub CLI, SSH

Windows Terminal에서 PowerShell 프로필을 열고 Git과 GitHub 연결을 준비합니다. 이 설정을 마치면 GitHub 비밀번호를 터미널에 입력하지 않고 SSH로 저장소를 사용할 수 있습니다.

## 1. PowerShell과 작업 경로 확인

Windows Terminal은 PowerShell을 실행하는 터미널 앱입니다. `Windows PowerShell` 프로필은 보통 Windows PowerShell 5.1을 실행하고, `PowerShell` 프로필은 별도로 설치한 PowerShell 7을 실행할 수 있습니다.

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition
(Get-Process -Id $PID).Path
```

강의 명령은 Windows PowerShell 5.1과 PowerShell 7에서 함께 쓸 수 있는 문법을 사용합니다. 작업 루트는 현재 Windows 사용자의 홈 폴더 아래 `dongbu`입니다.

```powershell
Set-Location "$HOME\dongbu"
# 같은 경로를 명시적으로 쓰는 방법
Set-Location "$env:USERPROFILE\dongbu"
```

`%USERPROFILE%\dongbu`는 명령 프롬프트(`cmd.exe`) 문법이므로 PowerShell 명령에 사용하지 않습니다. 현재 위치를 확인합니다.

```powershell
Get-Location
Test-Path "$HOME\dongbu"
```

## 2. 설치 여부 확인

이미 설치된 프로그램은 다시 설치하지 않습니다.

```powershell
Get-Command winget -ErrorAction SilentlyContinue
Get-Command git -ErrorAction SilentlyContinue
Get-Command gh -ErrorAction SilentlyContinue
Get-Command ssh -ErrorAction SilentlyContinue
Get-Command code -ErrorAction SilentlyContinue
```

## 3. Git, GitHub CLI, VS Code 설치

`winget`을 사용할 수 있다면 다음 명령으로 설치합니다.

```powershell
winget install --id Git.Git -e --source winget
winget install --id GitHub.cli -e --source winget
winget install --id Microsoft.VisualStudioCode -e --source winget
```

`winget`이 없다면 공식 페이지의 Windows 설치 파일을 사용합니다.

- [Git for Windows](https://git-scm.com/install/windows)
- [GitHub CLI for Windows](https://github.com/cli/cli/blob/trunk/docs/install_windows.md)
- [Visual Studio Code for Windows](https://code.visualstudio.com/docs/setup/windows)

공식 페이지에서 받은 설치 파일은 실행 전에 디지털 서명을 확인할 수 있습니다. 파일명은 내려받은 실제 파일에 맞게 바꿉니다.

```powershell
Get-AuthenticodeSignature "$HOME\Downloads\Git-버전-64-bit.exe"
Get-AuthenticodeSignature "$HOME\Downloads\gh_버전_windows_amd64.msi"
```

`Status`가 `Valid`인지 확인합니다. 설치가 끝나면 Windows Terminal 창을 모두 닫고 새 창을 엽니다. 새 탭만 열면 변경된 `PATH`가 반영되지 않을 수 있습니다.

```powershell
git --version
gh --version
ssh -V
code --version
```

## 4. commit 작성자 설정

GitHub 로그인과 commit 작성자 설정은 서로 다릅니다. 예시를 본인 이름과 GitHub 계정에 등록한 이메일로 바꿉니다.

```powershell
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
git config --global --get user.name
git config --global --get user.email
git config --global --get core.autocrlf
```

`core.autocrlf`는 기존 값을 확인만 하고 수업 중 임의로 바꾸지 않습니다. GitHub에서 이메일을 숨기고 싶다면 GitHub가 제공하는 `noreply` 이메일을 사용합니다.

## 5. 기존 SSH 키 확인

새 키를 만들기 전에 기존 파일을 확인합니다.

```powershell
$sshDirectory = Join-Path $HOME '.ssh'
if (Test-Path $sshDirectory) {
    Get-ChildItem $sshDirectory -Force
} else {
    Write-Output '아직 .ssh 폴더가 없습니다.'
}
```

`id_ed25519`와 `id_ed25519.pub`가 이미 있다면 덮어쓰지 않습니다. 기존 키를 사용할지 새 이름의 키를 만들지는 강사 또는 PC 관리자와 먼저 확인합니다.

## 6. ED25519 SSH 키 생성

이메일을 본인 값으로 바꿉니다.

```powershell
ssh-keygen -t ed25519 -C "student@example.com"
```

저장 위치 질문에는 Enter를 눌러 기본 경로를 사용합니다. 기존 파일을 덮어쓸지 묻는다면 `n`을 입력하고 중단합니다.

개인 키가 유출됐을 때 바로 사용되지 않도록 SSH 키 암호 문구를 설정하는 편이 안전합니다. 암호 문구 없이 쓰려면 두 번 Enter를 누르지만, 공용 PC에서는 암호 문구 없는 개인 키를 만들지 않습니다.

- `id_ed25519`: 개인 키입니다. 다른 사람에게 보내거나 GitHub에 올리지 않습니다.
- `id_ed25519.pub`: 공개 키입니다. 이 파일만 GitHub에 등록합니다.

```powershell
ssh-keygen -lf "$HOME\.ssh\id_ed25519.pub"
Get-Content "$HOME\.ssh\id_ed25519.pub" -Encoding utf8
```

암호 문구를 나중에 추가하거나 바꾸려면 다음 명령을 사용합니다.

```powershell
ssh-keygen -p -f "$HOME\.ssh\id_ed25519"
```

## 7. GitHub CLI 로그인

Git 작업 프로토콜을 SSH로 선택하고 공개 키 등록 권한을 함께 요청합니다.

```powershell
gh auth login --hostname github.com --git-protocol ssh --web --skip-ssh-key --scopes admin:public_key
```

브라우저에서 사용할 GitHub 계정과 일회용 코드를 확인한 뒤 권한 요청을 승인합니다. 비밀번호나 인증 토큰을 PowerShell 명령에 직접 적지 않습니다.

```powershell
gh auth status --hostname github.com
```

`Logged in to github.com account` 뒤에 본인 GitHub 사용자명이 보여야 합니다. `--show-token` 옵션은 인증 토큰을 화면에 표시하므로 사용하지 않습니다.

## 8. 공개 키 등록

키 제목에는 컴퓨터 이름과 날짜를 넣습니다.

```powershell
$sshKeyTitle = "$env:COMPUTERNAME-$(Get-Date -Format yyyy-MM-dd)"
gh ssh-key add "$HOME\.ssh\id_ed25519.pub" --title $sshKeyTitle
```

`Public key added to your account`가 표시되면 등록됐습니다. 권한 오류가 나오면 추가 권한을 승인한 뒤 등록 명령을 다시 실행합니다.

```powershell
gh auth refresh --hostname github.com --scopes admin:public_key
gh api user/keys --jq '.[].title'
```

## 9. SSH 연결 테스트

```powershell
ssh -T git@github.com
```

처음 연결할 때는 [GitHub가 공개한 SSH 키 지문](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)과 화면의 지문을 비교합니다. 일치하면 `yes`를 입력합니다.

```text
Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
```

위 문장이 나오면 성공입니다. GitHub는 일반 SSH 셸을 제공하지 않으므로 종료 코드가 `1`이어도 정상입니다. `USERNAME`이 본인 계정인지 확인합니다.

## 10. 수업 시작 전 확인

```powershell
Set-Location "$HOME\dongbu\Git_Steps"
git --version
gh --version
git config --global --get user.name
git config --global --get user.email
gh auth status --hostname github.com
ssh -T git@github.com
git status
```

설치 명령을 찾지 못하면 Windows Terminal 창을 모두 닫고 새로 엽니다. SSH 인증이 실패하면 [문제 해결](../troubleshooting.md)을 확인합니다.

## 공용 PC 정리

공용 PC에서는 수업 뒤 로그인과 작성자 정보를 정리합니다.

```powershell
gh auth logout --hostname github.com
git config --global --unset user.name
git config --global --unset user.email
```

GitHub 웹사이트의 `Settings > SSH and GPG keys`에서 해당 PC의 공개 키도 삭제합니다. 개인 키 파일은 다른 저장소나 서비스에서 사용하는지 확인한 뒤 강사 또는 PC 관리자 지침에 따라 삭제합니다.

## 공식 안내

- [GitHub CLI 로그인](https://cli.github.com/manual/gh_auth_login)
- [GitHub CLI SSH 키 등록](https://cli.github.com/manual/gh_ssh-key_add)
- [GitHub SSH 키 생성](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub SSH 연결 테스트](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)
