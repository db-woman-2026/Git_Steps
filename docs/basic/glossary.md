# Glossary

Git 실습에서 자주 보는 기본 용어입니다.

## repository

Git이 변경 기록을 저장하는 프로젝트 공간입니다.

```text
Git 저장소 = 파일 + Git 기록
```

## working tree

내가 VSCode에서 실제로 파일을 열고 수정하는 작업 폴더입니다.

```text
working tree에서 파일 수정 -> Git이 변경으로 인식
```

## untracked

Git이 아직 관리하지 않는 파일입니다.

```text
?? practice/today.md
```

## modified

Git이 이미 알고 있는 파일이 수정된 상태입니다.

```text
modified: practice/intro.md
```

## stage

이번 commit에 넣을 변경을 고르는 단계입니다.

```bash
git add practice/intro.md
```

## commit

stage된 변경을 하나의 기록으로 저장한 것입니다.

```bash
git commit -m "Update intro"
```

## commit message

commit에 붙이는 짧은 설명입니다.

```text
Update intro
```

## branch

작업 흐름의 이름입니다.

```text
main
branch/profile-edit
```

## merge

한 branch의 변경을 다른 branch에 합치는 작업입니다.

```bash
git merge branch/profile-edit
```

## conflict

Git이 자동으로 합칠 수 없어 사람이 직접 결정해야 하는 상태입니다.

```text
<<<<<<< HEAD
현재 branch 내용
=======
들어오는 branch 내용
>>>>>>> branch/name
```

## remote

내 컴퓨터 밖에 있는 Git 저장소입니다. 수업에서는 GitHub 저장소를 remote로 사용합니다.

```bash
git remote add origin https://github.com/my-account/git-steps-practice.git
```

## origin

첫 번째 remote에 흔히 붙이는 이름입니다.

```text
origin = 내가 연결한 GitHub 저장소의 별명
```

## push

내 컴퓨터의 commit을 remote 저장소에 올리는 작업입니다.

```bash
git push -u origin main
```

## pull

remote 저장소의 변경을 내 컴퓨터로 가져와 합치는 작업입니다.

이 초급 실습에서는 pull conflict까지 다루지 않습니다.
