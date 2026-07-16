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

수업에서 starter 파일을 zip으로 받았다면 압축을 풀고 그 폴더를 VSCode로 엽니다. GitHub에서 강사용 저장소를 clone한 상태라면 이미 `.git` 폴더가 있으므로 이 단계의 `git init` 실습과 다릅니다. 초급 실습에서는 starter 파일만 있는 일반 폴더에서 시작하는 것을 기준으로 합니다.

### Git 사용자 정보

commit에는 작성자 이름과 이메일이 들어갑니다. 첫 commit 전에 현재 값을 확인합니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```bash
git config --global --get user.name
git config --global --get user.email
```

값이 없다면 본인 정보로 설정합니다.

```bash
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
```

공용 PC에서는 강사 지침에 따라 저장소 안에만 설정하거나 수업 뒤 전역 설정을 정리합니다. 설정 출처까지 확인하려면 `git config --list --show-origin`을 사용합니다.

폴더 안에는 다음 파일들이 있어야 합니다.

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

터미널에서 폴더 위치로 이동합니다.

```bash
cd Git_Steps
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
Set-Location C:\workspace\Git_Steps
```

폴더 이름은 다를 수 있습니다. 중요한 것은 `README.md`와 `practice` 폴더가 있는 위치에서 명령을 실행하는 것입니다.

## 작업 1. 아직 Git 저장소가 아닌지 확인하기

### 실습 내용

`git init`을 하기 전에 현재 폴더가 Git 저장소인지 확인합니다.

### 명령어

```bash
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

```bash
git init -b main
```

예상 출력:

```text
Initialized empty Git repository in .../Git_Steps/.git/
```

`.git` 폴더는 Git이 기록을 저장하는 숨김 폴더입니다. 수업 중에는 이 폴더를 직접 수정하지 않습니다.

### VSCode에서 볼 것

VSCode Source Control 화면에 여러 파일이 변경 파일로 보입니다.

처음 Git을 시작했기 때문에 Git 입장에서는 폴더 안의 모든 파일이 "새 파일"입니다.

## 작업 3. 현재 상태 확인하기

### 명령어

```bash
git status --short
```

예상 출력:

```text
?? .gitignore
?? README.md
?? docs/
?? practice/
```

`??`는 Git이 아직 추적하지 않는 파일이라는 뜻입니다.

첫 단계에서는 diff를 자세히 읽지 않습니다. 아직 이전 commit이 없어서 "이전 단계와 무엇이 달라졌는지"를 비교하는 흐름이 아니기 때문입니다.

지금은 `??` 표시가 "Git이 아직 모르는 파일"이라는 것만 이해하면 충분합니다.

## 작업 4. 첫 commit에 넣을 파일 stage 하기

### 실습 내용

첫 commit에 현재 starter 파일들을 모두 포함합니다.

### 명령어

```bash
git add .
```

stage 후 상태를 확인합니다.

```bash
git status --short
```

예상 출력:

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

`A`는 added, 즉 첫 commit에 새로 추가될 파일이라는 뜻입니다.

## 작업 5. 첫 commit에 들어갈 파일 목록 확인하기

### 실습 내용

첫 commit 전에는 "어떤 파일들이 commit에 들어갈 예정인지"만 확인합니다.

### 명령어

```bash
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

```bash
git diff --staged --stat
```

파일 내용까지 확인하려면 `git diff --staged`를 사용합니다. `git diff`만 실행하면 아직 stage하지 않은 변경을 보여주므로 두 명령의 대상을 구분합니다.

## 작업 6. 첫 commit 만들기

### 명령어

```bash
git commit -m "Initialize Git learning project"
```

예상 출력:

```text
[main (root-commit) ea10cb3] Initialize Git learning project
 8 files changed, ...
```

`root-commit`은 이 저장소의 첫 commit이라는 뜻입니다.

commit 후 상태를 확인합니다.

```bash
git status
```

변경 목록이 비어 있어야 합니다.

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
https://github.com/my-account/git-steps-practice.git
```

아래 명령에서 주소는 반드시 본인 저장소 주소로 바꿉니다.

```bash
git remote add origin https://github.com/my-account/git-steps-practice.git
```

연결 상태를 확인합니다.

```bash
git remote -v
```

예상 출력:

```text
origin  https://github.com/my-account/git-steps-practice.git (fetch)
origin  https://github.com/my-account/git-steps-practice.git (push)
```

`origin`은 원격 저장소의 별명입니다. 보통 첫 번째 원격 저장소 이름으로 `origin`을 사용합니다.

## 작업 9. 최초 push 하기

HTTPS 주소로 처음 push하면 Git Credential Manager가 브라우저 로그인을 열 수 있습니다. GitHub 비밀번호를 터미널에 직접 입력하지 않습니다. 브라우저에서 로그인할 계정과 저장소가 본인 것인지 확인합니다.

### 명령어

```bash
git push -u origin main
```

예상 출력:

```text
To https://github.com/my-account/git-steps-practice.git
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

```bash
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
