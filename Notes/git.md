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
* *git log* :: gets the log of the commits and can be used with --oneline to make it short, and --decorate to print out the reference names
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
* *git remote rename <from remote name> <to remote name>* :: changes the remote name from 'from' to 'to'
* *git remote rm <remote name>* :: removes a remote
* *git tag -a <tag name> -m <message>* :: creates an annotated tag for the current commit
* *git tag <tag name>* :: create a lightweight tag for your current commit
* *git tag* :: lists all the tags for the repo
* *git push <remote name> <tag name>* :: use this to push the specific tag to the remote to share with other users. To push all tags, replace the <tag name> with the flag --tags
* *git branch <branch-name>* :: creates a new branch and has a pointer to the same commit as the master branch initially. This command does not switch to the newly created branch and move the HEAD pointer to the branch. Use git branch -d <branch-name> to delete the branch. Use git branch to show all branches and git branch -v to see the last commits along with all the branches
* *git checkout <branch-name>* :: switches to the branch-name branch by changing HEAD to point to the branch. Use git checkout -b <branch-name> to create a new branch and switch to it
* *git merge <branch-name>* :: merge the branch-name branch into the current branch. Does a fast-forward merge, where HEAD points to new commit of the merged branch, or merge-commit, where the commit has multiple parent commits


# Use Cases 
## 1. Revisiting a repo
1. Check the status of the files in the repo using git status
  1. If there are unstaged files, check the files differences with the stage using git diff
  2. If there are modified staged files, check the files differences with the commits by using git diff --stage
2. Check the message of the latest commits by using git log
3. Look at all the branches that exist, 
 
Use git diff to see the code changes between modified files that have not been staged and the corresponding staged file. Use git diff --staged
## 2. Undoing changes
1. Check the log of the repo using git log --oneline
2. Checkout the hash of the commit found via the log to get to the repo you want to inspect. Use git checkout <commit hash> <optional file name>
3. Look at the file or files to see if they match the state of the file you want to fall back to. Once done checkout the master branch again (or whatever branch you are working from) by using git checkout <branch name> 
4. If you checked out only a file in step 2, use git checkout HEAD <file name> instead of git checkout <branch name> as outlined in step 3.
## 3. Branching and merging
1. Create a new branch using git branch or git checkout -b
2. When you are finished with the branch, commit the changes and checkout the branch you would like to merge your newly created branch into (for example, if you just finished branch is3, and want to merge it into the master branch, do git checkout master, and then git merge is3)
3. If your merge succeeds, there will be no conflicts and you will not need to make a new commit
4. If there are merge conflicts, use git mergetools or open the files manually and replace the conflict texts with the appropriate code (you can find which files are conflicted by using git status)
5. Commit the new code, often writing a longer message (thus using git commit without the -m flag) to annotate what the merge conflict was

