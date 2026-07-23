# Step 11. 코드 파일 수정·삭제 conflict

한 branch에서는 `tasks.mjs`에 우선순위를 추가하고 `main`에서는 같은 모듈을 삭제합니다.

## 실습 순서

1. `branch/add-priority`에서 `tasks.mjs`를 수정하고 commit합니다.
2. `main`에서 `tasks.mjs`를 삭제하고 commit합니다.
3. merge해 modify/delete conflict를 만듭니다.
4. 우선순위를 추가한 모듈을 살립니다.
5. 프로그램을 실행하고 해결 commit을 push합니다.

## 완료 기준

우선순위 데이터가 남고 프로그램이 다시 실행되며 해결 commit이 원격 저장소에 있으면 완료입니다.
