# Git 기초 실습

Windows 11의 VS Code와 PowerShell에서 연습 파일과 Git 저장소를 직접 만들고 GitHub에 기록합니다. 문서 수정으로 기본 동작을 익힌 뒤 후반부에는 작은 JavaScript 프로젝트를 고치며 branch와 conflict를 연습합니다.

이 저장소에는 단계별 설명과 기준 스냅샷이 있습니다. `$HOME\dongbu\git-practice`에 개인 연습 저장소를 만들고 모든 파일을 직접 입력합니다.

## 시작 순서

1. [Windows 11 초기 설정](docs/lecture/requirements.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Windows 11 x64, Git, GitHub 초기 설정」 · 절 「1. Windows Terminal 설치」)</span>을 끝냅니다.
2. [Git 기본 읽기 자료](docs/basic/README.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Git 기초 개념」 · 절 「문서 구성」)</span>에서 저장소, stage, commit, branch를 확인합니다.
3. [단계별 실습](docs/lecture/README.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: Git · 장 「Git 단계별 실습」 · 절 「실습 원칙」)</span>에서 수정할 내용을 확인합니다.
4. 모든 코드는 직접 입력합니다.
5. 각 단계가 끝나면 commit을 확인하고 개인 GitHub 저장소에 push합니다.

Step은 장 번호입니다. 실제 작업은 자신이 만든 저장소의 `main`에서 이어갑니다. 실습 중 `branch/profile-edit`처럼 명시된 branch만 직접 만들고 합칩니다.

## 실습 절차

| 장 | 실습 |
| --- | --- |
| Step 0 | 저장소 초기화, 첫 commit, GitHub 최초 push |
| Step 1~2 | 파일 수정, diff, stage, commit |
| Step 3~7 | branch 생성, 비교, 충돌 없는 merge |
| Step 8~10 | conflict 생성, 중단, 재현, 해결 |
| Step 11~13 | 실제 JavaScript 파일의 수정·삭제 conflict와 기능 branch |
| Step 14 | 실행 결과와 GitHub 기록 최종 확인 |

## 저장소 구성

- `docs/lecture/`: 단계별 설명과 명령
- `docs/basic/`: Git 구조와 용어
- `docs/troubleshooting.md`: 오류 확인과 복구
- `practice/`: 각 단계가 끝난 뒤의 기준 연습 파일

## 매 단계 공통 확인

```powershell
git branch --show-current
git status --short
git diff
git diff --staged
git log --oneline -3
```

명령을 실행하기 전에 현재 branch와 변경 파일을 확인합니다. commit 뒤에는 작업 파일 목록이 비어 있어야 하며, push 뒤에는 `main`과 `origin/main`이 같은 commit을 가리켜야 합니다.
