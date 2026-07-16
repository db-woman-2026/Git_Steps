# Step 0. Git 저장소 초기화와 GitHub 최초 push

## 목표

아직 Git 저장소가 아닌 실습 폴더를 Git 저장소로 만들고, 첫 commit을 만든 뒤 GitHub 원격 저장소에 `main` 브랜치를 처음 push합니다.

## 실습 순서

1. 실습 폴더를 준비합니다.
2. `git init -b main`으로 로컬 Git 저장소를 만듭니다.
3. `git status`로 아직 추적하지 않는 파일들을 확인합니다.
4. `git add .`로 첫 commit에 넣을 파일을 stage 합니다.
5. `git status`로 stage된 파일 목록을 확인합니다.
6. `Initialize Git learning project` 메시지로 첫 commit을 만듭니다.
7. GitHub에 빈 저장소를 만듭니다.
8. `git remote add origin ...`으로 원격 저장소를 연결합니다.
9. `git push -u origin main`으로 최초 push를 합니다.

## VSCode에서 볼 것

- Source Control에 Initialize Repository 버튼이 보일 수 있습니다.
- `git init` 후에는 Source Control에 여러 파일이 변경 파일로 표시됩니다.
- stage 후에는 파일들이 Staged Changes 영역으로 이동합니다.
- 첫 commit 후에는 변경 목록이 비어 있어야 합니다.
- push 후에는 GitHub 웹사이트에서 같은 파일과 commit 기록이 보여야 합니다.

## 완료 기준

`git status`에서 `main`이 `origin/main`과 연결되어 있고, GitHub 저장소에 첫 commit이 올라가 있으면 완료입니다.
