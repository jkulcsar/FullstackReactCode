
## Merge a branch back into the main line
 - to merge a 'section_name_branch_here' back into the main line (here: re-create) :
`
git checkout re-create
git pull origin re-create
git merge 'section_name_branch_here'
git push origin re-create
`

- after this, just create a new branch based on the updated main line (here: re-create)


## Rename a branch
If you want to rename a branch while pointed to any branch, do:

`git branch -m <oldname> <newname>`
If you want to rename the current branch, you can do:

`git branch -m <newname>`
A way to remember this, is -m is for "move" (or mv), which is how you rename files.

## To create new node.js based Heroku apps
Use the following command;
`heroku create --buildpack https://github.com/heroku/heroku-buildpack-nodejs.git`

This sets up the correct build chain on the Heroku server side; does nothing in the local repository.
