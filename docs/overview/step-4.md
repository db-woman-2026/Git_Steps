# Step 4. 충돌 없이 브랜치 합치기

## 목표

브랜치에서 만든 변경을 `main`에 합치는 기본 merge를 연습합니다.

## 실습 순서

1. `main` 브랜치로 이동합니다.
2. `branch/profile-edit` 브랜치를 merge 합니다.
3. `practice/profile.md`에 브랜치에서 추가한 문장이 들어왔는지 확인합니다.
4. `practice/merge-log.md`에 fast-forward 결과를 기록하고 commit합니다.
5. `main`을 개인 원격 저장소에 push합니다.

## VSCode에서 볼 것

- 충돌이 없으면 Git이 자동으로 내용을 합칩니다.
- merge 후 `main`에도 브랜치의 변경 내용이 보입니다.
- 변경이 한 방향으로만 진행된 경우에는 fast-forward로 끝날 수 있습니다. 이때는 새 merge commit 작성 화면이 나오지 않아도 정상입니다.
- 작업 기록은 `Record fast-forward merge` commit으로 남깁니다.

## 완료 기준

`main`에서 브랜치의 수정 내용과 merge 기록 파일을 확인하고 push하면 완료입니다.
