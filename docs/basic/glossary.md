# Git 기본 용어

## repository

Git이 파일의 변경 이력을 저장하고 관리하는 공간입니다. 줄여서 **repo**라고도 합니다.

```text
repository = 현재 파일 + Git 기록
```

## working tree

파일을 만들고 수정하고 삭제하는 실제 작업 폴더입니다. **working directory**라고도 합니다.

## untracked

Git이 아직 관리하지 않는 새 파일의 상태입니다.

```text
?? todo.txt
```

## modified

마지막 commit 이후 파일 내용이 바뀐 상태입니다.

```text
modified: notes.txt
```

## stage

다음 commit에 포함할 변경을 모아 두는 영역입니다. **staging area**, **index**라고도 합니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```bash
git add notes.txt
```

## commit

stage에 모인 변경을 하나의 기록으로 저장한 것입니다.

```bash
git commit -m "Update notes"
```

## commit message

commit에 붙이는 짧은 설명입니다.

```text
Update notes
```

## commit ID

각 commit을 구분하는 고유한 값입니다. 긴 문자열이지만 보통 앞부분만 짧게 표시합니다.

```text
9f23f22
```

## HEAD

현재 선택된 위치를 나타내는 특별한 이름입니다. 보통 현재 branch의 최신 commit을 가리킵니다.

## branch

특정 commit을 가리키는 이름입니다. 서로 다른 변경 흐름을 나누는 데 사용합니다.

```text
main
topic
```

## merge

한 branch의 변경 이력을 현재 branch에 합치는 기능입니다.

```bash
git merge topic
```

## conflict

서로 다른 변경을 Git이 자동으로 합칠 수 없는 상태입니다. 사람이 최종 내용을 결정해야 합니다.

```text
1 | <<<<<<< HEAD
2 | 현재 branch의 내용
3 | =======
4 | 들어오는 branch의 내용
5 | >>>>>>> topic
```

## remote

현재 컴퓨터 밖에 있는 Git 저장소입니다. GitHub 같은 서비스의 저장소를 remote로 연결할 수 있습니다.

```bash
git remote add origin https://github.com/account/repository.git
```

## origin

remote 저장소에 흔히 붙이는 기본 별명입니다. 반드시 `origin`이어야 하는 것은 아닙니다.

## push

로컬 저장소의 commit을 remote 저장소로 전송합니다.

```bash
git push -u origin main
```

## pull

remote 저장소의 변경을 가져와 현재 branch에 합칩니다.

```bash
git pull
```

## local

현재 컴퓨터 안에 있는 저장소나 branch를 뜻합니다.

## remote branch

remote 저장소에 있는 branch의 상태를 나타냅니다.

```text
origin/main
```
