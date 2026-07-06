# Step 14. GitHub에 올리기

## 이번 스텝 Overview

이번 단계에서는 로컬 컴퓨터에 있는 Git 저장소를 GitHub에 올립니다.

지금까지 만든 commit들은 내 컴퓨터 안에만 있습니다. GitHub에 push하면 온라인 저장소에서도 파일과 commit 기록을 확인할 수 있습니다.

이번 단계에서는 수강생 개인 GitHub 저장소에 `main` 브랜치를 push합니다. `step-1`, `step-2` 같은 브랜치는 강사용 자료 브랜치이므로 수강생 실습 저장소에서는 push하지 않아도 됩니다.

## 실습 시작 전 확인

step 13을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- conflict가 남아 있지 않음
- GitHub에 빈 저장소를 만들 준비가 되어 있음

확인 명령:

```bash
git status
git branch --show-current
git diff
```

`git diff` 결과가 아무것도 나오지 않아야 합니다. 이번 단계에서는 파일을 새로 수정하지 않고, 이미 commit된 기록을 원격 저장소에 올립니다.

## 작업 1. GitHub에 빈 저장소 만들기

### GitHub 웹사이트에서 할 일

1. GitHub에 로그인합니다.
2. 새 repository를 만듭니다.
3. 저장소 이름을 정합니다. 예시는 다음과 같습니다.

```text
git-steps-practice
```

4. README, .gitignore, license는 GitHub에서 추가하지 않습니다.

이미 로컬에 파일과 commit이 있기 때문에 GitHub 저장소는 비어 있는 상태로 만들어야 합니다.

## 작업 2. 현재 origin 확인하기

### 왜 확인하는가

강사용 저장소를 clone해서 실습했다면 `origin`이 강사용 저장소를 가리킬 수 있습니다. 그 상태로 push하면 권한 오류가 나거나, 잘못된 저장소에 push하려고 시도하게 됩니다.

먼저 현재 원격 주소를 확인합니다.

```bash
git remote -v
```

아무것도 나오지 않으면 아직 원격 저장소가 연결되지 않은 상태입니다.

주소가 나온다면 그 주소가 내 개인 GitHub 저장소인지 확인합니다.

## 작업 3. 원격 저장소 연결하기

아래 주소는 예시입니다. 반드시 본인 GitHub 계정과 저장소 주소로 바꿔서 사용합니다.

```text
https://github.com/my-account/git-steps-practice.git
```

### origin이 아직 없다면

```bash
git remote add origin https://github.com/my-account/git-steps-practice.git
```

### origin이 이미 있는데 내 저장소가 아니라면

```bash
git remote set-url origin https://github.com/my-account/git-steps-practice.git
```

다시 확인합니다.

```bash
git remote -v
```

fetch와 push 주소가 내 개인 저장소로 보이면 정상입니다.

## 작업 4. main 브랜치 push하기

```bash
git push -u origin main
```

처음 push할 때는 GitHub 로그인이나 인증 창이 뜰 수 있습니다. VSCode나 브라우저 안내에 따라 로그인합니다.

성공하면 다음과 비슷한 메시지가 보입니다.

```text
To https://github.com/my-account/git-steps-practice.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

`-u`는 앞으로 `main`이 `origin/main`과 연결되어 있다는 것을 기억하게 합니다. 다음부터는 단순히 `git push`만 입력해도 되는 경우가 많습니다.

## 작업 5. GitHub 웹사이트에서 확인하기

GitHub 저장소 페이지를 새로고침하고 다음을 확인합니다.

- `README.md`가 보이는가
- `practice` 폴더가 보이는가
- commit 기록이 보이는가
- 마지막 commit이 step 13에서 만든 반복 실습 commit인가

commit 목록을 열어 보면 지금까지 만든 기록이 시간순으로 보입니다.

## 작업 6. 로컬 상태 확인하기

```bash
git status
```

정상이라면 다음과 비슷한 메시지가 나옵니다.

```text
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

이 상태는 로컬 `main`과 GitHub의 `origin/main`이 같은 commit을 가리키고 있다는 뜻입니다.

## 자주 헷갈리는 점

### step 브랜치도 push해야 하나요?

수강생 실습에서는 `main`만 push하면 충분합니다.

`step-1`, `step-2` 같은 브랜치는 이 강의 자료를 관리하기 위한 강사용 참고 브랜치입니다.

### GitHub에서 README를 만들었으면 어떻게 되나요?

이 수업에서는 GitHub 저장소를 빈 상태로 만드는 것을 기준으로 합니다.

GitHub에서 README를 먼저 만들면 로컬 commit과 GitHub commit이 서로 달라져 추가 설명이 필요합니다. 초급 과정에서는 피하는 것이 좋습니다.

### push 전에 git diff가 있어도 되나요?

권장하지 않습니다. commit하지 않은 변경이 남아 있다면 먼저 commit하거나 되돌린 뒤 push합니다.

이번 단계의 push는 "작업 폴더에 남은 수정"을 올리는 것이 아니라, "이미 만든 commit 기록"을 올리는 것입니다.

## 완료 기준

다음 조건을 만족하면 step 14가 완료된 것입니다.

- 개인 GitHub 저장소가 만들어졌습니다.
- 로컬 저장소의 `origin`이 개인 저장소 주소를 가리킵니다.
- `git push -u origin main`이 성공했습니다.
- GitHub 웹사이트에서 파일과 commit 기록을 확인했습니다.
- `git status`에서 로컬 `main`이 `origin/main`과 최신 상태라고 나옵니다.

이 단계까지 끝나면 Git의 가장 기본 흐름인 수정, diff 확인, stage, commit, branch, merge, conflict 해결, push를 한 번씩 직접 경험한 것입니다.
