# Chapter 2. status, stage, commit

## 변경을 기록하는 흐름

Git에서 변경을 기록하는 기본 흐름은 다음과 같습니다.

```text
파일 수정 -> 변경 확인 -> 변경 선택 -> commit
             status       stage
```

## status

`git status`는 작업 폴더와 stage의 현재 상태를 보여줍니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

```bash
git status
```

예시:

```text
Changes not staged for commit:
  modified:   notes.txt

Untracked files:
  todo.txt
```

| 표시 | 의미 |
| --- | --- |
| `modified` | 이전에 기록한 파일의 내용이 바뀜 |
| `Untracked files` | 아직 Git이 관리하지 않는 새 파일 |

`status`는 파일 내용을 바꾸지 않습니다. 현재 상태를 확인만 합니다.

## stage

**stage**는 다음 commit에 포함할 변경을 모아 두는 영역입니다. **staging area** 또는 **index**라고도 부릅니다.

```bash
git add notes.txt
```

`git add`는 지정한 파일의 현재 변경을 stage에 올립니다. stage에 올라간 변경은 다음처럼 표시됩니다.

```text
Changes to be committed:
  modified:   notes.txt
```

stage가 있기 때문에 여러 변경 중 일부만 선택하여 하나의 commit으로 묶을 수 있습니다.

```text
notes.txt 수정 ─┐
                ├─ stage -> 하나의 commit
todo.txt 추가 ──┘
profile.md 수정 ── stage에 올리지 않음
```

## commit

**commit**은 stage에 모인 변경을 하나의 기록으로 저장한 것입니다.

```bash
git commit -m "Update notes"
```

commit에는 다음 정보가 포함됩니다.

- 저장된 파일 상태
- 이전 commit과의 연결
- 작성자와 작성 시각
- 변경을 설명하는 commit message
- commit을 구분하는 고유한 ID

commit 후에도 stage에 올리지 않은 변경은 작업 폴더에 그대로 남습니다.

## add와 commit의 차이

| 명령 | 역할 |
| --- | --- |
| `git add` | 변경을 다음 기록의 후보로 선택 |
| `git commit` | 선택된 변경을 실제 기록으로 저장 |

```text
작업 폴더        stage           Git 기록
notes.txt  --add--> notes.txt --commit--> commit A
```

## 정리

- `git status`는 현재 파일과 stage의 상태를 보여줍니다.
- stage는 다음 commit에 포함할 변경을 선택하는 영역입니다.
- `git add`는 변경을 stage에 올립니다.
- `git commit`은 stage의 변경을 하나의 기록으로 저장합니다.
