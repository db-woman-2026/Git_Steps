# Windows 11 x64 실습 안내

이 강의는 Windows 11 x64와 Windows Terminal의 `Windows PowerShell` 프로필만 사용합니다. 프로그램 설치부터 GitHub SSH 연결까지 [수업 전 초기 설정](./lecture/requirements.md)을 먼저 완료합니다.

## 저장소 열기

강의 저장소의 고정 위치는 `$HOME\dongbu\Git_Steps`입니다.

```powershell
Set-Location "$HOME\dongbu\Git_Steps"
git status
git branch --show-current
code .
```

다른 위치에서 명령을 실행했다면 먼저 `Get-Location`으로 현재 경로를 확인합니다. 공백이 있는 경로는 전체를 큰따옴표로 묶습니다.

## PowerShell에서 사용하는 파일 명령

```powershell
Get-Location
Get-ChildItem
Get-Content .\README.md -Encoding utf8
Select-String -Path .\README.md -Pattern 'Git'
Test-Path .\practice\intro.md
Copy-Item .\practice\intro.md .\practice\intro-copy.md
Remove-Item .\practice\intro-copy.md
```

`git status`, `git add`, `git commit`, `git switch`, `git merge`는 그대로 실행합니다. 모든 셸 코드 블록은 Windows Terminal의 PowerShell에 입력합니다.

## 줄바꿈과 인코딩

VS Code 오른쪽 아래에서 파일 인코딩이 `UTF-8`인지 확인합니다. 저장소의 `.gitattributes`가 강의 파일의 줄바꿈을 관리하므로 수업 중 `core.autocrlf` 전역 값을 임의로 변경하지 않습니다.

```powershell
git config --global --get core.autocrlf
git check-attr text eol -- README.md
git diff --check
```

줄바꿈만 바뀐 파일이 많이 보이면 commit하지 말고 현재 branch, `.gitattributes`, VS Code 줄바꿈 표시를 먼저 확인합니다.

## 설치와 인증 확인

```powershell
node --version
npm.cmd --version
git --version
gh --version
code --version
gh auth status --hostname github.com
ssh -T git@github.com
```

명령을 찾지 못하면 Windows Terminal 창을 모두 닫고 새로 엽니다. 자세한 설치 및 복구 절차는 [수업 전 초기 설정](./lecture/requirements.md)과 [문제 해결](./troubleshooting.md)을 따릅니다.
