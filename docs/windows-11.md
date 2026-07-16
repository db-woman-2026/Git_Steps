# Windows 11 환경 준비

Windows 11에서는 Windows Terminal의 PowerShell로 실습합니다. Git Bash나 WSL을 따로 설치하지 않아도 됩니다.

## 1. 프로그램 설치

다음 공식 안내에 따라 설치합니다.

- [Git for Windows](https://git-scm.com/install/windows.html)
- [Visual Studio Code](https://code.visualstudio.com/docs/setup/windows)

`winget`을 쓴다면 다음 명령으로 설치합니다.

```powershell
winget install --id Git.Git -e --source winget
winget install --id Microsoft.VisualStudioCode -e --source winget
```

설치 후 터미널을 새로 열고 확인합니다.

```powershell
git --version
code --version
Get-Command git
```

`code`를 찾지 못하면 VS Code 설치 후 터미널을 다시 엽니다.

## 2. 저장소 열기

OneDrive 동기화 폴더보다 `C:\workspace`처럼 짧은 작업 경로를 권장합니다.

```powershell
Set-Location C:\workspace\Git_Steps
git status
git branch --show-current
code .
```

경로에 공백이 있다면 `Set-Location 'C:\Users\student\My Projects\Git_Steps'`처럼 따옴표로 묶습니다.

## 3. 이름과 이메일 확인

커밋 전에 현재 설정을 확인합니다.

```powershell
git config --global --get user.name
git config --global --get user.email
git config --global --get core.autocrlf
```

이름과 이메일이 없다면 수업에서 사용할 값을 설정합니다. `core.autocrlf`는 기존 프로젝트의 줄바꿈에 영향을 주므로 실습 중 임의로 바꾸지 않습니다. 이 저장소의 `.gitattributes`가 강의 파일의 줄바꿈을 LF로 맞춥니다.

## 4. PowerShell 명령 대응

| macOS·Linux 예제 | PowerShell |
| --- | --- |
| `pwd` | `Get-Location` |
| `ls` | `Get-ChildItem` |
| `cat FILE` | `Get-Content FILE -Encoding utf8` |
| `grep "WORD" FILE` | `Select-String -Path FILE -Pattern "WORD"` |
| `cp A B` | `Copy-Item A B` |
| `rm FILE` | `Remove-Item FILE` |
| `test -f FILE` | `Test-Path FILE` |

`git status`, `git add`, `git commit`, `git switch`, `git merge`는 PowerShell에서도 그대로 실행합니다.

## 5. 편집과 줄바꿈

VS Code 오른쪽 아래에서 파일 인코딩이 UTF-8인지 확인합니다. 충돌 표시를 수정한 뒤에는 파일 끝의 줄바꿈도 남깁니다. PowerShell에서 파일 내용을 확인할 때는 `Get-Content FILE -Encoding utf8`을 사용합니다.
