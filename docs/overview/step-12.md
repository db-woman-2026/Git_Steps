# Step 12. 여러 줄 충돌 해결하기

## 목표

한 줄이 아니라 여러 줄 문단에서 conflict가 날 때 필요한 내용만 골라 정리합니다.

## 실습 흐름

1. `main`에서 새 브랜치 `branch/team-note-other`를 먼저 만듭니다.
2. 다시 `main`으로 돌아옵니다.
3. `main`에서 `practice/team-note.md`의 문단을 여러 줄로 수정하고 commit 합니다.
4. `branch/team-note-other`로 이동합니다.
5. 같은 문단을 다른 방향으로 수정하고 commit 합니다.
6. `main`으로 돌아와 `branch/team-note-other`를 merge해서 conflict를 만듭니다.
7. 두 변경 내용을 읽고 필요한 문장만 남깁니다.
8. 저장, stage, commit 순서로 마무리합니다.

## VSCode에서 볼 것

- conflict 영역이 여러 줄로 길어질 수 있습니다.
- 버튼으로 해결하기보다 문단을 직접 읽고 정리하는 것이 더 자연스러울 수 있습니다.

## 완료 기준

최종 문단이 어색하지 않고 conflict marker가 모두 사라졌으면 완료입니다.
