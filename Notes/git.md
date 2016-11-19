Git cheat-sheet and concept notes:

# Configuration
Git uses the following config files in order of precedence:

1. config (.git/config) of repository
2. ~/.gitconfig or ~/.config/git/config specific to the user of the workstation
3. /etc/gitconfig for all users on workstation (R/W from this file using command git config --system)

Use .gitignore to ignore certain files in the working directory that you would not like git to track or show in the status. 

# Cheat Sheet
* *git clone <repo url>* :: copies a repo down to your working directory and adds an origin remote that connects to originating url
* *git status* :: use to check for the status of each item in the working directory
* *git add <path/filename>* :: use to stage files
* *git commit* :: use to commit files to the current branch. Add the -m flag to write a message with the commiti, and use --amend flag to update a commit that you've already made
* *git diff* :: use to see changes of files between its staged version and the modified but unstaged version. Use --stageflag to compare the file between committed file 
* *git rm <path/filename>* :: use to remove a file from the staging area and the working directory to untrack the file. Add the --cached flag in order to only remove the file from the staging area and not in the working directory 
* *git remote* :: lists all the remotes for the repo. Add the -v flag to show the urls of the remote
* *git remote add <shortname> <url>* :: adds a new remote with a given shorthand name
* *git fetch <remote name>* :: gets the remote's data that you don't have yet, and downloads it to your local repo. It does not merge or modify your current working directory.
* *git pull* :: fetches from remote master branch and merges it into you working directory
* *git push <remote name> <branch name>* :: pushes the branch to the remote server
* *git remote show <remote name>* :: shows details about remotes and their branches, and the remote-branch mapping info
* *git remote rename <from remote name> <to remote name>* :: changes the remote name from to to
* *git remote rm <remote name>* :: removes a remote
* *git tag -a <tag name> -m <message>* :: creates an annotated tag for the current commit
* *git tag <tag name>* :: create a lightweight tag for your current commit
* *git tag* :: lists all the tags for the repo
* *git push <remote name> <tag name>* :: use this to push the specific tag to the remote to share with other users. To push all tags, replace the <tag name> with the flag --tags

# Use Cases 
## 1. Revisiting a repo
1. Check the status of the files in the repo using git status
  a. If there are unstaged files, check the files differences with the stage using git diff
  b. If there are modified staged files, check the files differences with the commits by using git diff --stage
2. Check the message of the latest commits by using git log
3. Look at all the branches that exist, 
 
Use git diff to see the code changes between modified files that have not been staged and the corresponding staged file. Use git diff --staged
## 2. Undoing changes
1. Check the log of the repo using git log --oneline
2. Checkout the hash of the commit found via the log to get to the repo you want to inspect. Use git checkout <commit hash> <optional file name>
3. Look at the file or files to see if they match the state of the file you want to fall back to. Once done checkout the master branch again (or whatever branch you are working from) by using git checkout <branch name> 
4. If you checked out only a file in step 2, use get checkout HEAD <file name> instead of git checkout <branch name> as outlined in step 3.

