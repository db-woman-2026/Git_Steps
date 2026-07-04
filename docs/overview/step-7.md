# Step 7. 같은 파일의 다른 줄을 고친 브랜치 합치기

## 목표

같은 파일을 수정해도 서로 다른 줄이면 자동으로 합쳐질 수 있음을 확인합니다.

## 실습 흐름

1. `branch/profile-name` 브랜치에서 `practice/profile.md`의 이름 줄을 수정하고 commit 합니다.
2. `main`으로 돌아옵니다.
3. `branch/profile-interest` 브랜치에서 같은 파일의 관심사 줄을 수정하고 commit 합니다.
4. `main`으로 돌아와 두 브랜치를 차례로 merge 합니다.

## VSCode에서 볼 것

- 같은 파일이어도 수정 위치가 다르면 Git이 자동으로 합칠 수 있습니다.
- merge 후 한 파일 안에 두 브랜치의 변경이 함께 들어옵니다.

## 완료 기준

`practice/profile.md`에 이름 수정과 관심사 수정이 모두 반영되면 완료입니다.
