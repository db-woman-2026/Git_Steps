# Git 단계별 실습

[Windows 11 초기 설정](./requirements.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Windows 11 x64, Git, GitHub 초기 설정」 · 절 「1. Windows Terminal 설치」)</span>을 확인합니다. 각 장은 직전 장에서 만든 자신의 저장소 상태를 이어서 사용합니다.

## 실습 원칙

1. Windows Terminal의 PowerShell에서 실행합니다.
2. 자신의 저장소 `main`에서 시작합니다.
3. 코드와 명령은 복사해 붙이지 않고 직접 입력합니다.
4. 명령 전에는 `git branch --show-current`와 `git status`를 확인합니다.
5. stage 전에는 `git diff`, stage 후에는 `git diff --staged`를 읽습니다.
6. commit 후 작업 폴더가 깨끗한지 확인합니다.
7. 각 장 마지막에 개인 GitHub 저장소로 push합니다.

문서 제목의 Step은 장 번호입니다. `branch/profile-edit`, `feature/pending-count`처럼 본문에서 만드는 이름만 실제 연습 branch입니다.

## 실습 목록

| 장 | 문서 | 결과 |
| --- | --- | --- |
| Step 0 | [저장소 초기화와 최초 push](./step-0.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 0. Git 저장소 초기화와 GitHub 최초 push」 · 절 「변경 내용」)</span> | 개인 저장소와 `origin/main` |
| Step 1 | [첫 파일 수정 commit](./step-1.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 1. 첫 파일 수정 commit 만들기」 · 절 「변경 내용」)</span> | 수정 파일 commit |
| Step 2 | [변경 내용 비교](./step-2.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 2. 변경 내용 비교하기」 · 절 「변경 내용」)</span> | diff 읽기 |
| Step 3 | [첫 branch](./step-3.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 3. 첫 브랜치 만들기」 · 절 「변경 내용」)</span> | branch별 파일 차이 |
| Step 4 | [충돌 없는 merge](./step-4.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 4. 충돌 없이 브랜치 합치기」 · 절 「변경 내용」)</span> | `main`에 변경 합치기 |
| Step 5 | [새 파일 merge](./step-5.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 5. 새 파일을 추가한 브랜치 합치기」 · 절 「변경 내용」)</span> | 새 파일 추가 |
| Step 6 | [서로 다른 파일 merge](./step-6.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 6. 서로 다른 파일을 고친 브랜치 합치기」 · 절 「변경 내용」)</span> | 두 branch 합치기 |
| Step 7 | [같은 파일의 다른 위치](./step-7.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 7. 같은 파일의 다른 위치를 고친 브랜치 합치기」 · 절 「변경 내용」)</span> | 자동 merge 확인 |
| Step 8 | [첫 conflict](./step-8.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 8. 첫 충돌 만들기」 · 절 「변경 내용」)</span> | conflict 확인 후 merge 중단 |
| Step 9 | [VS Code로 해결](./step-9.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 9. 충돌을 해결하고 JavaScript 실습 준비하기」 · 절 「변경 내용」)</span> | conflict 해결 commit과 코드 실습 준비 |
| Step 10 | [코드 한 줄 conflict](./step-10.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 10. 함수 한 줄 conflict 해결하기」 · 절 「변경 내용」)</span> | formatter 함수 해결 |
| Step 11 | [코드 파일 수정·삭제 conflict](./step-11.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 11. 코드 파일 수정·삭제 conflict 해결하기」 · 절 「변경 내용」)</span> | 모듈을 살리는 해결 |
| Step 12 | [여러 줄 코드 conflict](./step-12.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 12. 여러 줄 코드 conflict 통합하기」 · 절 「변경 내용」)</span> | 실행 흐름 통합 |
| Step 13 | [기능 branch 반복](./step-13.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 13. 기능 branch 두 번 반복하기」 · 절 「변경 내용」)</span> | 두 기능을 `main`에 merge |
| Step 14 | [최종 확인과 push](./step-14.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Step 14. 실행 결과와 GitHub 기록 최종 확인하기」 · 절 「변경 내용」)</span> | 실행 결과와 원격 기록 확인 |

[실습 구성](../course-plan.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Git 실습 구성」 · 절 「시작 조건」)</span>에는 주제별 확인 결과가 있고, [문제 해결](../troubleshooting.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Git 실습 문제 해결」 · 절 「commit에서 이름과 이메일을 요구합니다」)</span>에는 로그인·merge·push 오류 복구 순서가 있습니다.
