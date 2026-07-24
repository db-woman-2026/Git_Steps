# Step 4. 충돌 없이 브랜치 합치기

## 변경 내용

step 3에서 만든 `branch/profile-edit` 브랜치의 변경을 `main`에 합칩니다.

merge는 한 브랜치의 변경 이력을 다른 브랜치에 합치는 작업입니다. 지금은 `branch/profile-edit`을 만든 뒤 `main`에 새 commit이 없으므로 fast-forward merge가 됩니다.

`main`의 `practice/profile.md`에 브랜치에서 추가했던 문장이 들어 있는지 확인합니다.

## 시작 전 확인

step 3을 끝낸 상태에서 시작합니다.

기대 상태는 다음과 같습니다.

- 현재 브랜치: `main`
- `branch/profile-edit` 브랜치가 존재함
- `main`에는 아직 브랜치 연습 문장이 없음
- `branch/profile-edit`에는 브랜치 연습 문장이 있음

확인 명령은 다음과 같습니다.

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(Git · Windows 11 x64 실습 안내 · 개인 실습 저장소 열기)</span>를 먼저 확인합니다. 아래 `git` 명령은 PowerShell에서도 같습니다.

```powershell
git branch --show-current
git branch --list
git diff main..branch/profile-edit -- practice/profile.md
```

## 작업 1. merge 전에 들어올 변경 확인하기

### 실습 내용

merge하기 전에 `main`으로 들어올 변경을 먼저 확인합니다.

### 명령어

```powershell
git diff main..branch/profile-edit -- practice/profile.md
```

### 예상 git diff

```diff
diff --git a/practice/profile.md b/practice/profile.md
index 767a26c..da9d4de 100644
--- a/practice/profile.md
+++ b/practice/profile.md
@@ -3,3 +3,4 @@
 - 이름: Git Learner
 - 관심사: Git으로 문서 변경 정리하기
 - 오늘의 연습: 변경 내용을 비교하고 저장하기
+- 브랜치 연습: 원본과 따로 수정해 보기
```

이 diff는 "merge하면 `main`에 이 줄이 추가될 예정"이라는 뜻입니다.

## 작업 2. main에 브랜치 합치기

### VSCode 절차

1. 왼쪽 아래 브랜치 이름이 `main`인지 확인합니다.
2. Source Control 또는 브랜치 메뉴에서 `branch/profile-edit`을 `main`에 merge합니다.
3. merge가 끝난 뒤 `practice/profile.md`를 엽니다.
4. 브랜치 연습 문장이 들어왔는지 확인합니다.

### 명령어로 한다면

```powershell
git switch main
git merge branch/profile-edit
```

예상 출력은 다음과 비슷할 수 있습니다.

```text
Updating 0d13b0f..136e1c0
Fast-forward
 practice/profile.md | 1 +
```

`Fast-forward`는 별도의 merge commit 없이 `main`이 `branch/profile-edit`의 commit 위치로 이동했다는 뜻입니다.

## 작업 3. merge 후 파일 확인하기

### 명령어

```powershell
Get-Content -LiteralPath 'practice/profile.md' -Encoding utf8
```

PowerShell에서는 다음 명령을 사용합니다.

```powershell
Get-Content practice/profile.md -Encoding utf8
```

예상 내용은 다음과 같습니다.

```md
# Profile

- 이름: Git Learner
- 관심사: Git으로 문서 변경 정리하기
- 오늘의 연습: 변경 내용을 비교하고 저장하기
- 브랜치 연습: 원본과 따로 수정해 보기
```

### 상태 확인

```powershell
git status
git log --oneline -1
```

merge가 끝났고 남은 변경이 없다면 작업 폴더가 깨끗해야 합니다. 마지막 log에는 `Add branch profile note`가 보여야 합니다.

## 작업 4. merge 후 diff가 비는 이유 이해하기

merge 전에는 `main`과 `branch/profile-edit` 사이에 차이가 있었습니다.

merge 후에는 `main`이 그 변경을 받아들였기 때문에 두 브랜치의 파일 내용이 같아집니다.

```powershell
git diff main..branch/profile-edit -- practice/profile.md
```

이제 아무 내용도 나오지 않는 것이 정상입니다.

## 작업 5. merge 확인 기록 남기기

fast-forward merge는 새 merge commit을 만들지 않습니다. 확인 결과를 별도 파일로 기록해 merge 이력을 남깁니다.

VS Code에서 `practice/merge-log.md`를 만들고 다음 내용을 직접 입력합니다.

```md
# Merge Log

- Step 4: branch/profile-edit을 main에 fast-forward로 합쳤습니다.
```

파일과 stage 내용을 차례로 확인한 뒤 commit합니다.

```powershell
git status --short
git diff -- practice/merge-log.md
git add practice/merge-log.md
git diff --staged -- practice/merge-log.md
git commit -m "Record fast-forward merge"
```

## 원격 저장소에 기록하기

현재 단계의 commit이 개인 저장소의 `origin/main`에 올라갑니다.

```powershell
git branch --show-current
git status --short
git push origin main
git status --short --branch
```

push가 끝나면 로컬 commit이 원격 저장소에도 보이는지 확인합니다.

## 완료 기준

다음 조건을 만족하면 step 4가 완료된 것입니다.

- 현재 브랜치가 `main`입니다.
- `practice/profile.md`에 `- 브랜치 연습: 원본과 따로 수정해 보기` 줄이 있습니다.
- `practice/merge-log.md`에 fast-forward 확인 기록이 있습니다.
- 마지막 commit은 `Record fast-forward merge`입니다.
- Source Control 변경 목록이 비어 있습니다.
- merge 중 conflict가 발생하지 않았습니다.
