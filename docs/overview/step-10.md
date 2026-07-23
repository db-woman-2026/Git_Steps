# Step 10. 함수 한 줄 conflict 해결하기

`formatTask()`의 반환값을 두 branch에서 다르게 고친 뒤 상태 단어와 기호를 모두 남깁니다.

## 실습 순서

1. `branch/format-label`을 만듭니다.
2. `main`에서는 기호를, 다른 branch에서는 상태 단어를 넣습니다.
3. 두 commit을 merge해 conflict를 만듭니다.
4. 두 요구를 합친 함수를 직접 입력합니다.
5. Node.js 실행 뒤 해결 commit을 push합니다.

## 완료 기준

conflict marker가 없고 formatter의 세 줄 출력이 확인되며 해결 commit이 push되어 있으면 완료입니다.
