# Step 10. 직접 문장을 고쳐 충돌 해결하기

## 목표

버튼만 누르지 않고 최종 문장을 직접 작성해서 conflict를 해결합니다.

## 실습 순서

1. `main`에서 새 브랜치 `branch/goal-other`를 먼저 만듭니다.
2. 다시 `main`으로 돌아옵니다.
3. `main`에서 `practice/goal.md`의 문장을 수정하고 commit 합니다.
4. `branch/goal-other`로 이동합니다.
5. 같은 문장을 다른 내용으로 수정하고 commit 합니다.
6. `main`으로 돌아와 `branch/goal-other`를 merge해서 conflict를 만듭니다.
7. VSCode에서 충돌 영역을 확인합니다.
8. 둘 중 하나를 그대로 고르지 말고 새 문장으로 직접 정리합니다.
9. 저장한 뒤 stage 하고 commit 합니다.

## VSCode에서 볼 것

- conflict marker가 남아 있으면 아직 해결되지 않은 상태입니다.
- 최종 문장은 자연스러운 한 문장이어야 합니다.

## 완료 기준

충돌 표시 없이 직접 작성한 최종 문장이 commit되어 있으면 완료입니다.
