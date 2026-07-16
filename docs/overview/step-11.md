# Step 11. 한쪽은 수정하고 한쪽은 삭제한 파일 합치기

## 목표

한 브랜치에서는 파일을 수정하고, 다른 브랜치에서는 같은 파일을 삭제한 상황을 경험합니다.

## 실습 순서

1. `branch/edit-memo`에서 `practice/memo.md` 내용을 수정하고 commit 합니다.
2. `main`으로 돌아와 `practice/memo.md`를 삭제하고 commit 합니다.
3. `branch/edit-memo`를 merge 합니다.
4. 파일을 남길지 삭제할지 결정합니다.

## VSCode에서 볼 것

- Git은 수정된 파일을 살릴지, 삭제 상태를 유지할지 물어봅니다.
- 이 상황은 "어느 쪽이 맞는지 사람이 결정해야 하는 경우"입니다.
- 파일을 남기려면 Explorer에 남아 있는 `practice/memo.md`를 stage 합니다.
- 파일을 삭제하기로 했다면 파일을 삭제한 상태를 stage 합니다.

## 완료 기준

파일을 남기거나 삭제하는 결정을 한 뒤 merge가 완료되면 성공입니다.
