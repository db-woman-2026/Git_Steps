# Step 0. Git 저장소 초기화와 GitHub 최초 push

## 이번 단계에서 할 일

아직 Git 저장소가 아닌 일반 폴더를 Git 저장소로 만듭니다.

다음 순서로 진행합니다.

```text
실습 폴더 준비 -> git init -> 첫 commit -> GitHub 빈 저장소 생성 -> remote 연결 -> 최초 push
```

완료 후에는 내 컴퓨터의 `main` 브랜치와 GitHub의 `origin/main` 브랜치가 연결되어 있어야 합니다.

## 시작 전 확인

이 단계는 Git을 아직 시작하지 않은 상태에서 출발합니다.

[수업 전 초기 설정](./requirements.md)을 먼저 마칩니다. `git --version`, `gh auth status --hostname github.com`, `ssh -T git@github.com`에서 설치와 본인 계정을 확인합니다.

수업에서 starter ZIP 파일을 받았다면 압축을 풀고 그 폴더를 VSCode로 엽니다. starter 파일이 없다면 [강사용 저장소의 `main` 브랜치 ZIP 파일](https://github.com/db-woman-2026/Git_Steps/archive/refs/heads/main.zip)을 내려받아 압축을 풉니다. GitHub의 ZIP 파일에는 `.git` 폴더가 없으므로 `git init`부터 실습할 수 있습니다.

강사용 저장소를 `git clone`한 폴더에는 이미 `.git` 폴더가 있습니다. clone한 폴더에서 `git init`을 다시 실행하지 않습니다.

### Git 사용자 정보

commit에는 작성자 이름과 이메일이 들어갑니다. 첫 commit 전에 현재 값을 확인합니다.

> Windows 11의 터미널과 편집기 사용법은 [환경 준비](../windows-11.md)를 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```powershell
git config --global --get user.name
git config --global --get user.email
```

개인 PC에서 값이 없다면 본인 정보로 설정합니다.

```powershell
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
```

공용 PC에서는 위 전역 설정 명령을 실행하지 않습니다. 작업 2의 `git init`을 마친 뒤 다음 명령으로 이 실습 저장소에만 사용자 정보를 설정합니다.

```powershell
git config user.name "Student Name"
git config user.email "student@example.com"
```

설정 출처까지 확인하려면 `git config --list --show-origin`을 사용합니다.

폴더 안에는 적어도 다음 파일들이 있어야 합니다.

```text
README.md
.gitignore
docs/overview/index.md
practice/intro.md
practice/profile.md
practice/goal.md
practice/memo.md
practice/team-note.md
```

`main` 브랜치 ZIP 파일에는 기초 문서와 검증 스크립트도 들어 있습니다. 아래 `git status` 예시는 핵심 경로만 줄여서 보여 주므로 파일 수가 더 많아도 정상입니다.

PowerShell에서 실습 폴더로 이동합니다.

```powershell
Set-Location "$HOME\dongbu\Git_Steps"
```

폴더 이름은 다를 수 있습니다. 중요한 것은 `README.md`와 `practice` 폴더가 있는 위치에서 명령을 실행하는 것입니다.

## 작업 1. 아직 Git 저장소가 아닌지 확인하기

### 실습 내용

`git init`을 하기 전에 현재 폴더가 Git 저장소인지 확인합니다.

### 명령어

```powershell
git status
```

아직 Git 저장소가 아니라면 다음과 비슷한 메시지가 나옵니다.

```text
fatal: not a git repository (or any of the parent directories): .git
```

이 메시지는 실패가 아닙니다. 아직 Git을 시작하지 않았다는 뜻입니다.

## 작업 2. Git 저장소 초기화하기

### 실습 내용

현재 폴더를 Git 저장소로 만듭니다.

### 명령어

```powershell
git init -b main
```

예상 출력:

```text
Initialized empty Git repository in .../Git_Steps/.git/
```

`.git`은 commit과 branch 기록이 저장되는 숨김 폴더입니다. 수업 중에는 이 폴더를 직접 수정하지 않습니다.

### VSCode에서 볼 것

VSCode Source Control 화면에 여러 파일이 변경 파일로 보입니다.

첫 commit이 아직 없으므로 폴더 안의 파일이 모두 추적되지 않은 새 파일로 표시됩니다.

## 작업 3. 현재 상태 확인하기

### 명령어

```powershell
git status --short
```

예상 출력의 일부:

```text
?? .gitignore
?? README.md
?? docs/
?? practice/
?? scripts/
```

`??`는 아직 추적 대상에 추가하지 않은 파일이라는 뜻입니다.

첫 단계에서는 diff를 자세히 읽지 않습니다. 아직 이전 commit이 없어서 "이전 단계와 무엇이 달라졌는지"를 비교하는 흐름이 아니기 때문입니다.

지금은 `??`가 첫 commit에 아직 포함되지 않은 파일을 나타낸다는 점만 확인합니다.

## 작업 4. 첫 commit에 넣을 파일 stage 하기

### 실습 내용

첫 commit에 현재 starter 파일들을 모두 포함합니다.

### 명령어

```powershell
git add .
```

stage 후 상태를 확인합니다.

```powershell
git status --short
```

제공받은 최소 starter의 예상 출력:

```text
A  .gitignore
A  README.md
A  docs/overview/index.md
A  practice/goal.md
A  practice/intro.md
A  practice/memo.md
A  practice/profile.md
A  practice/team-note.md
```

`main` 브랜치 ZIP 파일로 시작했다면 `docs/basic/`, `docs/course-plan.md`, `scripts/` 같은 경로도 `A`로 표시됩니다. 내려받은 파일을 모두 첫 commit에 넣는 것이므로 그대로 진행합니다.

`A`는 added, 즉 첫 commit에 새로 추가될 파일이라는 뜻입니다.

## 작업 5. 첫 commit에 들어갈 파일 목록 확인하기

### 실습 내용

첫 commit 전에는 "어떤 파일들이 commit에 들어갈 예정인지"만 확인합니다.

### 명령어

```powershell
git status
```

예상 출력:

```text
On branch main

No commits yet

Changes to be committed:
  new file:   .gitignore
  new file:   README.md
  new file:   docs/overview/index.md
  new file:   practice/goal.md
  new file:   practice/intro.md
  new file:   practice/memo.md
  new file:   practice/profile.md
  new file:   practice/team-note.md
```

여기서는 파일 내용 비교보다 "첫 commit에 들어갈 파일이 모두 stage 되었는지"가 중요합니다.

VSCode에서는 Source Control의 Staged Changes 영역에 파일들이 들어가 있으면 됩니다.

터미널에서는 stage된 파일과 변경량을 한 번 더 확인합니다.

```powershell
git diff --staged --stat
```

파일 내용까지 확인하려면 `git diff --staged`를 사용합니다. `git diff`만 실행하면 아직 stage하지 않은 변경을 보여주므로 두 명령의 대상을 구분합니다.

## 작업 6. 첫 commit 만들기

### 명령어

```powershell
git commit -m "Initialize Git learning project"
```

예상 출력:

```text
[main (root-commit) ea10cb3] Initialize Git learning project
 8 files changed, ...
```

`root-commit`은 이 저장소의 첫 commit이라는 뜻입니다.

commit 후 상태를 확인합니다.

```powershell
git status
git log --oneline -1
```

변경 목록이 비어 있어야 합니다. 마지막 log에는 `Initialize Git learning project`가 보여야 하며, 앞의 commit hash는 환경마다 달라집니다.

## 작업 7. GitHub에 빈 저장소 만들기

### GitHub 웹사이트에서 할 일

1. GitHub에 로그인합니다.
2. 새 repository를 만듭니다.
3. 저장소 이름을 정합니다.

예시:

```text
git-steps-practice
```

4. README, .gitignore, license는 GitHub에서 추가하지 않습니다.

이미 로컬에 첫 commit이 있으므로 GitHub 저장소는 비어 있어야 합니다.

## 작업 8. 원격 저장소 연결하기

GitHub에서 만든 저장소 주소를 복사합니다.

예시 주소:

```text
git@github.com:my-account/git-steps-practice.git
```

아래 명령에서 주소는 반드시 본인 저장소 주소로 바꿉니다.

```powershell
git remote add origin git@github.com:my-account/git-steps-practice.git
```

연결 상태를 확인합니다.

```powershell
git remote -v
```

예상 출력:

```text
origin  git@github.com:my-account/git-steps-practice.git (fetch)
origin  git@github.com:my-account/git-steps-practice.git (push)
```

`origin`은 원격 저장소의 별명입니다. 보통 첫 번째 원격 저장소 이름으로 `origin`을 사용합니다.

## 작업 9. 최초 push 하기

[수업 전 초기 설정](./requirements.md)에서 SSH 연결 테스트를 마쳤다면 GitHub 비밀번호를 입력하지 않습니다. SSH 키 암호 문구를 설정했다면 그 암호 문구를 입력합니다.

### 명령어

```powershell
git push -u origin main
```

예상 출력:

```text
To github.com:my-account/git-steps-practice.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

`-u`는 로컬 `main`과 원격 `origin/main`을 연결해 두는 옵션입니다. 이후에는 `git push`만 입력해도 되는 경우가 많습니다.

## 작업 10. GitHub와 로컬 상태 확인하기

GitHub 저장소 페이지를 새로고침합니다.

다음이 보이면 정상입니다.

- `README.md`
- `practice` 폴더
- `docs` 폴더
- `Initialize Git learning project` commit

로컬에서도 확인합니다.

```powershell
git status
```

예상 출력:

```text
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

## 완료 기준

다음 조건을 만족하면 step 0이 완료된 것입니다.

- `git init -b main`으로 로컬 저장소를 만들었습니다.
- `Initialize Git learning project` 첫 commit을 만들었습니다.
- `origin`이 내 GitHub 저장소 주소를 가리킵니다.
- `git push -u origin main`으로 최초 push를 완료했습니다.
- GitHub 웹사이트에서 starter 파일과 첫 commit이 보입니다.

사용자 정보, 로그인, push에서 막히면 [Git 실습 문제 해결](../troubleshooting.md)을 확인합니다.

다음 단계에서는 이미 GitHub에 올라간 이 저장소에서 `practice/intro.md`를 수정하고, 두 번째 commit을 만들어 봅니다.
