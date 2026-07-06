# Git_Steps

`Git_Steps`는 Git을 처음 배우는 사람을 위한 아주 작은 연습 프로젝트입니다.

이 저장소의 목표는 복잡한 개발 협업을 배우는 것이 아닙니다. 문서 파일을 조금씩 고치면서 Git이 변경 내용을 어떻게 보여주고, 어떻게 저장하고, 브랜치를 어떻게 합치는지 익히는 것입니다.

## main 브랜치의 역할

`main` 브랜치는 수업을 시작하는 기본 상태입니다.

이 브랜치에는 다음 내용만 들어 있습니다.

- Git 학습 프로젝트 소개
- 실습에 사용할 Markdown 파일
- 단계별 개요 문서가 들어갈 `docs/overview` 폴더

각 수업 단계는 `step-0`, `step-1`, `step-2`처럼 별도 브랜치에 누적됩니다.

## 이 저장소를 처음 만든 흐름

처음에는 빈 폴더를 만들고 Git 저장소로 초기화합니다.

```bash
mkdir Git_Steps
cd Git_Steps
git init
```

그 다음 `README.md`, `practice` 폴더, `docs/overview` 폴더를 만들고 첫 커밋을 생성합니다.

```bash
git add .
git commit -m "Initialize Git learning project"
```

이후 GitHub에 빈 저장소를 만들고 원격 저장소를 연결한 뒤 최초 push를 합니다.

```bash
git remote add origin https://github.com/내계정/git-steps-practice.git
git push -u origin main
```

수업에서는 명령어를 모두 외우는 것보다 VSCode의 Source Control 화면에서 변경된 파일, 스테이지, 커밋, 브랜치, 머지를 눈으로 확인하는 데 집중합니다.

## 실습 파일

- `practice/intro.md`: 자기소개 문장 실습
- `practice/profile.md`: 프로필 수정 실습
- `practice/goal.md`: 목표 문장 수정 실습
- `practice/memo.md`: 수정과 삭제 충돌 실습
- `practice/team-note.md`: 여러 줄 충돌 실습

## 단계 문서

단계별 짧은 설명은 `docs/overview/step-N.md` 파일로 구성됩니다.

현재 브랜치에 따라 보이는 step 문서가 달라질 수 있습니다.
