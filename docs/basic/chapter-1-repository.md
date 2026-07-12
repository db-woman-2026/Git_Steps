# Chapter 1. Git 저장소와 작업 폴더

## 핵심 생각

Git은 파일의 현재 모습만 보는 도구가 아닙니다. 파일이 어떻게 바뀌었는지 기록으로 남기는 도구입니다.

처음에는 아래 세 가지만 구분하면 됩니다.

| 이름 | 쉬운 설명 |
| --- | --- |
| 작업 폴더 | 내가 VSCode에서 파일을 열고 수정하는 실제 폴더 |
| Git 저장소 | Git이 변경 기록을 저장하는 공간 |
| 파일 변경 | 이전에 저장한 내용과 지금 파일 내용이 달라진 상태 |

## 폴더 구조 예시

Git 실습 폴더는 다음처럼 단순한 파일들로 시작합니다.

```text
Git_Steps/
  README.md
  docs/
    basic/
      README.md
  practice/
    intro.md
    profile.md
```

수강생은 `practice/intro.md` 같은 파일을 수정합니다. Git은 그 파일이 이전 기록과 달라졌는지 확인합니다.

## Git을 시작하기 전 상태

아직 Git 저장소가 아닌 폴더에서 `git status`를 실행하면 다음처럼 보일 수 있습니다.

```text
fatal: not a git repository (or any of the parent directories): .git
```

이 메시지는 "아직 Git을 시작하지 않았다"는 뜻입니다.

## Git 저장소가 된 뒤

`git init`을 실행하면 현재 폴더가 Git 저장소가 됩니다.

```bash
git init -b main
```

그 뒤에는 Git이 폴더 안 파일들을 확인할 수 있습니다.

```bash
git status
```

예상 상태:

```text
On branch main

No commits yet

Untracked files:
  README.md
  practice/intro.md
  practice/profile.md
```

`Untracked files`는 Git이 아직 기록 대상으로 관리하지 않는 파일이라는 뜻입니다.

## 눈으로 익힐 구조

```text
내가 보는 파일
  -> README.md
  -> practice/intro.md

Git이 보는 상태
  -> 아직 기록한 적 없음
  -> 새 파일로 보임
```

## 정리

- 작업 폴더는 내가 파일을 수정하는 공간입니다.
- Git 저장소는 변경 기록을 저장하는 공간입니다.
- `git init`을 해야 Git이 현재 폴더를 관리하기 시작합니다.
- 처음 보이는 `Untracked files`는 아직 Git 기록에 넣지 않은 파일입니다.
