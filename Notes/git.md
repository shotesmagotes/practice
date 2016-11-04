Git cheat-sheet and concept notes:

# Configuration
Git uses the following config files in order of precedence:
1. config (.git/config) of repository
2. ~/.gitconfig or ~/.config/git/config specific to the user of the workstation
3. /etc/gitconfig for all users on workstation (R/W from this file using command git config --system)

Use .gitignore to ignore certain files in the working directory that you would not like git to track or show in the status. 

# Cheat Sheet
git status - use to check for the status of each item in the working directory
git add - use to stage files
git commit - use to commit files to the current branch
git diff - use to see changes of files between its staged version and the modified but unstaged version. Use --stageflag to compare the file between committed file 

# Use Cases 
## 1. Checking for differences
Use git diff to see the code changes between modified files that have not been staged and the corresponding staged file. Use git diff --staged
## 2. 
