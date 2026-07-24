# Chapter 3. commit 이력과 HEAD

## commit의 연결

각 commit은 바로 이전 commit을 가리킵니다. 여러 commit이 연결되면 파일의 변경 이력이 됩니다.

```text
A 첫 기록 -> B 내용 수정 -> C 문장 추가
```

가장 처음 만들어진 commit을 **root commit**이라고 합니다.

## commit 이력 보기

`git log`는 commit 이력을 보여줍니다.

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(Git · Windows 11 x64 실습 안내 · 개인 실습 저장소 열기)</span>를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 그대로 실행합니다.

```powershell
git log --oneline
```

예시:

```text
9f23f22 Add a sentence
3a2b1c4 Update notes
ea10cb3 Create initial files
```

기본 출력에서는 최신 commit이 위에 표시됩니다. 왼쪽의 짧은 문자열은 commit ID의 일부이고, 오른쪽은 commit message입니다.

## commit ID

모든 commit에는 서로 구분되는 ID가 있습니다.

```text
9f23f22 Add a sentence
^^^^^^^ commit ID의 짧은 형태
```

Git 명령에서는 전체 ID 대신 서로 구분되는 길이의 짧은 ID를 사용할 수 있습니다.

## HEAD

`HEAD`는 현재 선택된 위치를 나타내는 특별한 이름입니다. 보통은 현재 branch가 가리키는 최신 commit을 따라갑니다.

```text
A -> B -> C
          ^
          main
          HEAD
```

새 commit `D`가 만들어지면 현재 branch와 HEAD도 새 commit으로 이동합니다.

```text
A -> B -> C -> D
               ^
               main
               HEAD
```

## 이력과 현재 파일

작업 폴더의 기준은 HEAD가 가리키는 commit입니다. 파일을 수정하면 Git은 HEAD의 파일 상태와 현재 파일 상태를 비교합니다.

```text
HEAD의 notes.txt:  안녕하세요.
현재 notes.txt:    안녕하세요. 반갑습니다.

Git이 인식한 변경: "반갑습니다." 추가
```

## 정리

- commit은 이전 commit과 연결되어 이력을 만듭니다.
- commit ID는 각 commit을 구분하는 고유한 값입니다.
- `git log --oneline`은 commit 이력을 간단히 보여줍니다.
- HEAD는 현재 선택된 위치이며 보통 현재 branch의 최신 commit을 가리킵니다.
