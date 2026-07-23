# Step 8. 첫 충돌 만들기

## 목표

같은 줄을 서로 다르게 수정하면 conflict가 생긴다는 것을 확인합니다.

## 실습 순서

1. `main`에서 새 브랜치 `branch/intro-other`를 먼저 만듭니다.
2. 다시 `main`으로 돌아옵니다.
3. `main`에서 `practice/intro.md`의 한 문장을 수정하고 commit 합니다.
4. `branch/intro-other`로 이동합니다.
5. 같은 문장을 다른 내용으로 수정하고 commit 합니다.
6. `main`으로 돌아와 `branch/intro-other`를 merge 합니다.

## VSCode에서 볼 것

- Git이 자동으로 고를 수 없는 부분을 conflict로 표시합니다.
- 파일 안에 서로 다른 두 변경 내용이 함께 보입니다.

## 완료 기준

VSCode에서 `practice/intro.md`가 충돌 파일로 표시되면 완료입니다.
