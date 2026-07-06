# Git_Steps Capsule

## Project Purpose

`Git_Steps` is a beginner-friendly Git practice project for non-developers and first-time Git users.

The project does not teach Git as a deep development tool. It teaches Git as a way to save document changes, compare edits, create a safe branch, merge work back, and resolve simple conflicts in VSCode.

The teaching style follows the `step-N` branch approach used by `NextJsBlog_Steps`: each step branch adds one small learning unit on top of the previous step branch.

## Branch Structure

- `main`: starter files for the Git practice project.
- `step-0`: initializes a local Git repository, creates the first commit, connects a GitHub remote, and pushes `main`.
- `step-1` to `step-14`: cumulative overview and lecture documents for beginner Git practice.

Branches are cumulative. `step-1` is based on `step-0`, `step-2` is based on `step-1`, and so on.

The branch chain should preserve this invariant:

```bash
git merge-base --is-ancestor step-N step-(N+1)
```

## Documentation Layout

- `README.md`: explains the purpose of the repository from the `main` branch.
- `Git_Steps.info.md`: project maintenance and curriculum capsule.
- `docs/overview/`: short step overview files.
- `practice/`: simple Markdown files used for beginner Git exercises.

Only `docs/overview` is expanded in the first version of the curriculum. Full lecture notes can be added later if needed.

## Curriculum Scope

The curriculum intentionally stays small and avoids intermediate Git topics.

Included:

- checking changed files
- staging and committing
- reading simple history
- creating branches
- merging branches
- practicing several easy merge cases
- creating and resolving simple conflicts in VSCode
- pushing the repository to GitHub

Excluded:

- stash
- tag
- revert
- reset details
- rebase
- team collaboration workflows
- pull conflict scenarios
- Git internals

## Overview Steps

- `step-0`: initialize Git, create the first commit, connect GitHub, and push `main`
- `step-1`: first content edit commit
- `step-2`: compare changed content
- `step-3`: create the first branch
- `step-4`: merge a branch without conflict
- `step-5`: merge a branch that adds a new file
- `step-6`: merge branches that edit different files
- `step-7`: merge changes in different lines of the same file
- `step-8`: create the first conflict
- `step-9`: resolve a conflict with VSCode buttons
- `step-10`: resolve a conflict by editing the final sentence
- `step-11`: handle a file modified on one side and deleted on the other
- `step-12`: resolve a multi-line conflict
- `step-13`: repeat the branch and merge flow
- `step-14`: push the final practice result to GitHub

## Operational Notes

- Keep the project beginner-oriented.
- Prefer VSCode Source Control explanations over command-heavy explanations.
- Use Markdown files for all practice cases so students can safely edit text.
- If an earlier step changes, update that branch first and propagate forward by merging upward through the step chain.
