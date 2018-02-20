
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

Example:
```bash
  850  git branch -m 012-re-create
  851  git checkout re-create
  852  git pull origin re-create
  853  git merge 012-re-create
  854  git push origin re-create
```

## To create new node.js based Heroku apps
Use the following command;
`heroku create --buildpack https://github.com/heroku/heroku-buildpack-nodejs.git`

This sets up the correct build chain on the Heroku server side; does nothing in the local repository.

## Server environments
Section 6 Lecture 55 explains best why we have two servers in dev (react app server and express), how to make them work together in dev and how does this work in production: in prod there is only one server, express, running, serving up the main bundle of js file to which the entire react app is shrinked down using npm run build (and it puts them in the /build subfolder).
