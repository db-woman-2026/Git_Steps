# Chapter 1. Git 저장소와 작업 폴더

## Git이 기록하는 것

Git은 파일의 현재 내용과 이전에 저장한 내용을 비교해 변경 이력을 관리합니다. Git이 관리하는 폴더를 **저장소(repository)**라고 합니다.

```text
현재 파일 + 이전 commit 기록 = Git 저장소
```

## 작업 폴더

**작업 폴더(working tree)**는 파일을 만들고 수정하고 삭제하는 실제 공간입니다.

```text
repository/
  README.md
  notes.txt
  profile.md
```

작업 폴더의 파일이 마지막 commit과 달라지면 Git은 그 차이를 변경으로 인식합니다.

## 저장소 만들기

일반 폴더는 아직 Git 저장소가 아닙니다. 이 상태에서 `git status`를 사용하면 다음 메시지가 나타날 수 있습니다.

```text
fatal: not a git repository (or any of the parent directories): .git
```

`git init`은 현재 폴더에 Git 저장소를 만듭니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```powershell
git init -b main
```

저장소가 만들어지면 Git은 폴더 안 파일의 상태를 구분할 수 있습니다.

```powershell
git status
```

아직 한 번도 기록하지 않은 파일은 다음처럼 표시됩니다.

```text
On branch main

No commits yet

Untracked files:
  README.md
  notes.txt
```

`Untracked`는 Git이 아직 기록 대상으로 관리하지 않는 파일을 뜻합니다.

## 파일의 기본 상태

| 상태 | 의미 |
| --- | --- |
| Untracked | 아직 Git이 관리하지 않는 새 파일 |
| Unmodified | 마지막 commit과 내용이 같은 파일 |
| Modified | 마지막 commit 이후 내용이 바뀐 파일 |
| Staged | 다음 commit에 들어가도록 선택된 변경 |

파일은 변경과 기록에 따라 이 상태들 사이를 이동합니다.

```text
Untracked -> Staged -> Unmodified -> Modified -> Staged
```

## 정리

- 저장소는 파일과 Git 기록이 함께 있는 공간입니다.
- 작업 폴더는 현재 파일을 다루는 실제 공간입니다.
- `git init`은 일반 폴더를 Git 저장소로 만듭니다.
- Git은 파일을 Untracked, Unmodified, Modified, Staged 상태로 구분합니다.
