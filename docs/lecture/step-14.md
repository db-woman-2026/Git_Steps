# Step 14. 최종 결과 GitHub에 push하기

## 이번 단계에서 할 일

step 0에서 연결해 둔 GitHub 저장소에 최종 실습 결과를 다시 push합니다.

step 0에서 이미 첫 commit을 GitHub에 올렸습니다. 그 뒤 step 1부터 step 13까지 여러 commit이 로컬 `main`에 추가되었습니다. 이제 그 최종 결과를 GitHub의 `origin/main`에도 반영합니다.

이번 단계에서도 수강생 개인 GitHub 저장소에 `main` 브랜치만 push합니다. `step-0`, `step-1`, `step-2` 같은 브랜치는 강사용 자료 브랜치이므로 수강생 실습 저장소에서는 push하지 않아도 됩니다.

## 시작 전 확인

step 13을 끝낸 상태에서 시작합니다.

- 현재 브랜치: `main`
- Source Control 변경 목록: 비어 있음
- conflict가 남아 있지 않음
- `origin`이 step 0에서 만든 내 개인 GitHub 저장소를 가리킴

확인 명령:

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

```bash
git status
git branch --show-current
git diff
```

`git diff` 결과가 아무것도 나오지 않아야 합니다. 파일을 새로 수정하지 않고, 이미 commit된 기록을 원격 저장소에 올립니다.

## 작업 1. 현재 origin 확인하기

### 왜 확인하는가

step 0에서 원격 저장소를 연결했지만, 마지막 push 전에 다시 확인하는 습관을 들입니다.

현재 원격 주소를 확인합니다.

```bash
git remote -v
```

주소가 내 개인 GitHub 저장소인지 확인합니다.

만약 주소가 잘못되어 있다면 본인 저장소 주소로 고칩니다.

```bash
git remote set-url origin https://github.com/my-account/git-steps-practice.git
```

위 주소는 예시입니다. 반드시 본인 GitHub 계정과 저장소 주소로 바꿔서 사용합니다.

fetch와 push 주소가 내 개인 저장소로 보이면 정상입니다.

## 작업 2. main 브랜치 push하기

```bash
git push
```

step 0에서 `git push -u origin main`을 이미 실행했기 때문에, 보통은 `git push`만으로 충분합니다.

성공하면 다음과 비슷한 메시지가 보입니다.

```text
To https://github.com/my-account/git-steps-practice.git
   abc1234..def5678  main -> main
```

만약 `main`이 원격과 연결되어 있지 않다는 메시지가 나오면 다음 명령을 사용합니다.

```bash
git push -u origin main
```

## 작업 3. GitHub 웹사이트에서 확인하기

GitHub 저장소 페이지를 새로고침하고 다음을 확인합니다.

- `README.md`가 보이는가
- `practice` 폴더가 보이는가
- commit 기록이 보이는가
- 마지막 commit이 step 13에서 만든 반복 실습 commit인가

commit 목록을 열어 보면 지금까지 만든 기록이 시간순으로 보입니다.

## 작업 4. 로컬 상태 확인하기

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

`step-0`, `step-1`, `step-2` 같은 브랜치는 이 강의 자료를 관리하기 위한 강사용 참고 브랜치입니다.

### step 0에서 push했는데 왜 또 push하나요?

step 0에서는 starter 파일만 올라갔습니다. 이후 step 1부터 step 13까지 만든 commit은 다시 push해야 GitHub에도 반영됩니다.

### push 전에 git diff가 있어도 되나요?

권장하지 않습니다. commit하지 않은 변경이 남아 있다면 먼저 commit하거나 되돌린 뒤 push합니다.

이번 단계의 push는 "작업 폴더에 남은 수정"을 올리는 것이 아니라, "이미 만든 commit 기록"을 올리는 것입니다.

## 완료 기준

다음 조건을 만족하면 step 14가 완료된 것입니다.

- 개인 GitHub 저장소가 만들어졌습니다.
- 로컬 저장소의 `origin`이 개인 저장소 주소를 가리킵니다.
- `git push` 또는 `git push -u origin main`이 성공했습니다.
- GitHub 웹사이트에서 파일과 commit 기록을 확인했습니다.
- `git status`에서 로컬 `main`이 `origin/main`과 최신 상태라고 나옵니다.

이 단계까지 끝나면 Git의 가장 기본 흐름인 수정, diff 확인, stage, commit, branch, merge, conflict 해결, push를 한 번씩 직접 경험한 것입니다.
