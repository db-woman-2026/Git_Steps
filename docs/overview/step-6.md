# Step 6. 서로 다른 파일을 고친 브랜치 합치기

## 목표

두 브랜치가 서로 다른 파일을 수정하면 Git이 쉽게 합칠 수 있음을 확인합니다.

## 실습 흐름

1. `branch/edit-profile` 브랜치를 만들고 `practice/profile.md`를 수정한 뒤 commit 합니다.
2. `main`으로 돌아옵니다.
3. `branch/edit-goal` 브랜치를 만들고 `practice/goal.md`를 수정한 뒤 commit 합니다.
4. `main`으로 돌아와 두 브랜치를 차례로 merge 합니다.

## VSCode에서 볼 것

- 서로 다른 파일을 수정한 경우에는 대부분 충돌이 생기지 않습니다.
- merge 후 두 파일의 변경 내용이 모두 `main`에 들어옵니다.
- 첫 번째 merge는 fast-forward, 두 번째 merge는 merge commit으로 보일 수 있습니다. 둘 다 충돌 없이 합쳐졌다면 정상입니다.

## 완료 기준

`main`에서 `profile.md`와 `goal.md`의 변경 내용이 모두 보이면 완료입니다.
