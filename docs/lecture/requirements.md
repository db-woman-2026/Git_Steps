# 수업 전 초기 설정: Windows 11 x64, Git, GitHub

수업 PC를 처음 받은 상태에서 시작합니다. 기존에 프로그램이 보이더라도 아래 `winget install` 명령을 모두 실행해 설치 상태와 최신 안정판 여부를 확인합니다.

Windows Terminal은 터미널 앱이고 PowerShell은 그 안에서 명령을 실행하는 셸입니다. Windows Terminal을 설치한 뒤 모든 수업 명령을 `Windows PowerShell` 프로필에서 실행합니다.

## 1. Windows Terminal 설치

시작 메뉴에서 `Windows PowerShell`을 한 번 열고 다음 명령을 실행합니다.

```powershell
winget --version
winget install --id Microsoft.WindowsTerminal -e --source winget --accept-source-agreements --accept-package-agreements
```

`winget`을 찾지 못하면 [App Installer 공식 안내](https://learn.microsoft.com/windows/msix/app-installer/install-update-app-installer)를 따라 App Installer를 설치하거나 업데이트합니다. Windows Terminal 설치가 끝나면 처음 열었던 창을 닫습니다.

시작 메뉴에서 `Windows Terminal`을 열고 탭 오른쪽의 화살표에서 `Windows PowerShell`을 선택합니다. 이후 명령은 이 탭에서 실행합니다.

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition
(Get-CimInstance Win32_OperatingSystem) | Select-Object Caption, Version, BuildNumber, OSArchitecture
[System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
```

대상 환경에서는 Windows 11과 `X64`가 표시되어야 합니다. 강의 명령은 Windows PowerShell 5.1에서 실행할 수 있는 문법만 사용합니다.

## 2. 개발 프로그램 새로 설치

다음 명령을 위에서부터 한 줄씩 실행합니다. 깨끗한 PC에서는 새로 설치되고, 이미 설치된 PC에서는 winget이 현재 상태나 업데이트 가능 여부를 알려 줍니다.

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
winget install --id Git.Git -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
winget install --id GitHub.cli -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
winget install --id Microsoft.VisualStudioCode -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
```

설치가 끝나면 Windows Terminal 창을 모두 닫고 새 창을 엽니다. 기존 창에는 새 `PATH`가 반영되지 않을 수 있습니다.

```powershell
node --version
npm.cmd --version
git --version
gh --version
code --version
ssh -V
```

명령을 찾지 못하면 설치 직후 열려 있던 창인지 확인한 뒤 다음 명령으로 실행 파일 위치를 확인합니다.

```powershell
(Get-Command node).Source
(Get-Command git).Source
(Get-Command gh).Source
(Get-Command code).Source
```

> !@#windows11 test: [Windows 11 x64 초기화 PC에서 Windows Terminal, Node.js LTS x64, Git for Windows x64, GitHub CLI x64, VS Code x64를 위 winget 명령으로 신규 설치하고 버전 확인을 다시 수행합니다.]@#

## 3. 실습 폴더 준비

Step 0에서 `git init`부터 실행해야 하므로 clone이 아니라 `main` ZIP 파일을 사용합니다.

```powershell
New-Item -ItemType Directory -Path "$HOME\dongbu" -Force | Out-Null
$zipPath = Join-Path $HOME 'Downloads\Git_Steps-main.zip'
Invoke-WebRequest 'https://github.com/db-woman-2026/Git_Steps/archive/refs/heads/main.zip' -OutFile $zipPath
Expand-Archive -LiteralPath $zipPath -DestinationPath "$HOME\dongbu" -Force
Rename-Item -LiteralPath "$HOME\dongbu\Git_Steps-main" -NewName 'git-practice'
Set-Location "$HOME\dongbu\git-practice"
Test-Path -LiteralPath '.git'
```

마지막 명령은 `False`를 출력해야 합니다. 같은 이름의 폴더가 이미 있다면 기존 작업을 덮어쓰지 말고 새 실습 폴더 이름을 사용합니다. OneDrive가 관리하는 폴더는 피합니다.

## 4. commit 작성자 설정

GitHub 로그인과 commit 작성자 정보는 서로 다릅니다. 아래 예시를 본인의 이름과 GitHub 계정에 등록한 이메일로 바꿉니다.

```powershell
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
git config --global --get user.name
git config --global --get user.email
git config --global --get core.autocrlf
```

`core.autocrlf`는 현재 값을 확인만 합니다. 수업 중 전역 값을 임의로 바꾸지 않습니다.

## 5. SSH 키 확인과 생성

기존 키를 먼저 확인합니다.

```powershell
$sshDirectory = Join-Path $HOME '.ssh'
if (Test-Path $sshDirectory) {
    Get-ChildItem $sshDirectory -Force
} else {
    Write-Output '아직 .ssh 폴더가 없습니다.'
}
```

`id_ed25519`와 `id_ed25519.pub`가 없다면 새 키를 만듭니다. 이메일을 본인 값으로 바꾸고 저장 위치 질문에는 Enter를 눌러 기본 경로를 사용합니다.

```powershell
ssh-keygen -t ed25519 -C "student@example.com"
```

기존 키를 덮어쓸지 묻는다면 `n`을 입력하고 중단합니다. `id_ed25519`은 개인 키이므로 공유하거나 Git에 올리지 않습니다. GitHub에는 `id_ed25519.pub` 공개 키만 등록합니다.

## 6. GitHub CLI 로그인과 공개 키 등록

```powershell
gh auth login --hostname github.com --git-protocol ssh --web --skip-ssh-key --scopes admin:public_key
gh auth status --hostname github.com
```

브라우저에서 본인의 GitHub 계정으로 승인합니다. 인증 토큰과 SSH 암호 문구를 명령이나 문서에 적지 않습니다.

공개 키가 아직 등록되지 않았다면 다음 명령을 실행합니다.

```powershell
$sshKeyTitle = "$env:COMPUTERNAME-$(Get-Date -Format yyyy-MM-dd)"
gh ssh-key add "$HOME\.ssh\id_ed25519.pub" --title $sshKeyTitle
gh api user/keys --jq '.[].title'
```

## 7. SSH 연결과 실습 폴더 확인

```powershell
ssh -T git@github.com
Set-Location "$HOME\dongbu\git-practice"
Test-Path -LiteralPath '.git'
Get-ChildItem
code .
```

처음 연결할 때는 [GitHub SSH 키 지문](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)과 화면의 지문을 비교한 뒤 승인합니다. `.git` 확인은 여전히 `False`여야 합니다.

## 8. 시작 전 점검

```powershell
Set-Location "$HOME\dongbu\git-practice"
git --version
gh auth status --hostname github.com
Test-Path -LiteralPath '.git'
Get-ChildItem -LiteralPath '.\practice'
```

Git과 GitHub 로그인이 확인되고 `.git`이 아직 없으면 Step 0을 시작합니다.

## 공식 안내

- [Windows Terminal 설치](https://learn.microsoft.com/windows/terminal/install)
- [winget install 명령](https://learn.microsoft.com/windows/package-manager/winget/install)
- [Node.js 다운로드](https://nodejs.org/en/download)
- [Git for Windows](https://git-scm.com/install/windows)
- [GitHub CLI 설치](https://github.com/cli/cli/blob/trunk/docs/install_windows.md)
- [VS Code Windows 설치](https://code.visualstudio.com/docs/setup/windows)
- [GitHub SSH 키 생성](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
