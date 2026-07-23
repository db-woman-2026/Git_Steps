# Step 14. 실행 결과와 GitHub 기록 최종 확인하기

## 변경 내용

할 일 프로그램의 최종 동작을 확인하고 완료 기록을 commit합니다. 로컬 `main`과 GitHub의 `origin/main`이 같은 commit인지 비교합니다.

## 시작 전 확인

```powershell
git branch --show-current
git status --short
git remote -v
node .\practice\task-app\index.mjs
```

현재 branch는 `main`이고 작업 파일 목록은 비어 있어야 합니다. `origin`은 자신의 GitHub 저장소를 가리켜야 합니다.

예상 출력:

```text
완료: 1/3
대기: 2
대기 [ ] branch 연습
대기 [ ] push 확인
완료 [x] 환경 준비
높은 우선순위: 환경 준비, branch 연습
```

## 작업 1. 완료 기록 입력하기

`practice/completion.md`를 만들고 직접 입력합니다.

```md
# Git 실습 완료

- diff와 staged diff를 구분했습니다.
- 기능 branch를 main에 merge했습니다.
- conflict를 읽고 코드 실행으로 결과를 검증했습니다.
- 각 단계의 commit을 GitHub에 push했습니다.
```

## 작업 2. 마지막 commit과 push

```powershell
git diff -- .\practice\completion.md
git add .\practice\completion.md
git diff --staged -- .\practice\completion.md
git commit -m "Complete Git practice course"
git push origin main
```

## 작업 3. 로컬과 원격 비교

```powershell
git fetch origin
git status --short --branch
git log --oneline -5
git rev-parse --short main
git rev-parse --short origin/main
```

두 hash가 같아야 합니다. GitHub 웹사이트에서도 `practice/task-app`, `practice/completion.md`, 마지막 commit을 확인합니다.

## 문제가 있을 때

- `ahead`가 보이면 `git push origin main`을 다시 실행합니다.
- `behind`가 보이면 다른 PC나 GitHub에서 만든 commit이 있는지 확인합니다.
- 작업 파일이 보이면 `git diff`를 읽고 commit할 변경과 복구할 변경을 나눕니다.
- `--force`로 원격 기록을 덮어쓰지 않습니다.

## 완료 기준

- 최종 JavaScript 프로그램이 예상대로 실행됩니다.
- `Complete Git practice course` commit을 만들었습니다.
- `main`과 `origin/main`의 hash가 같습니다.
- GitHub에서 코드 파일과 commit 기록을 확인했습니다.
- `git status --short`의 출력이 없습니다.
