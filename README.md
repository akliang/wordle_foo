# Overview

A portable (offline-playable) version of Wordle (https://www.powerlanguage.co.uk/wordle/) with unlimited plays and (in the future) RPG elements.  Written completely in Vue3 using Vuex and Tailwind CSS.

Currently hosted at:
- Main branch: https://foostarstudio.com/wordfoo
- Develop branch: https://wordfoo-staging.albertliang.xyz

# Development

Feel free to fork or open pull requests!

To set up your own dev instance, just point a web server (e.g., Nginx) at the root directory (the one that holds index.html).
```
# example Nginx configuration (/etc/nginx/conf.d/default.conf)

server {
  server_name wordfoo-staging.albertliang.xyz;

  access_log /var/log/nginx/access-wordfoo_staging.log;
  error_log /var/log/nginx/error-wordfoo_staging.log;

  location / {
    root /var/www/html/wordfoo_develop;
  }
}
```

# Testing

Testing is done via Selenium (in a Docker container) against the staging instance.  This means that testing is done against the `develop` branch, with the assumption that it is identical to the `main` branch.  This may not hold true if you don't remember to merge `develop` into `main`.  (You can do that via `make merge`.)

```
# using Makefile
make build_tests
make test
```

If you need to access Python debugger (pdb), you will have to run pytest locally:

```
cd testing/
python3 -m venv venv
. venv/bin/activate
# have to upgrade pip or the cryptography Python module will fail
python3 -m pip install --upgrade pip
# some packages in requirements.txt only have wheel builds
pip install wheel
pip install -r requirements.txt
pytest test_game.py --pdb
```

Testing is also done automatically by Jenkins when the `main` branch is updated on server-side (which triggers the build by hitting a specific Jenkins project URL with `curl -X POST` via a Git post-receive hook).

```
# Example git hook (.git/hooks/post-receive)
# Note: this must be installed server-side, not client-side
#!/bin/bash

while read oldrev newrev refname
do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)
    if [ "main" = "$branch" ]; then
        curl -X POST 'https://<USER>:<API_KEY>@<JENKINS_PROJECT_URL_HERE>'
    fi
done
```

# Deploy

Deploy is handled automatically by Jenkins using `make` commands.

```
# Note: the Docker Jenkins image does not contain "make" out of the box
sudo apt install make
```

The `make prod` command uses `sed` to change the URLs of the Vue and Vuex CDN imports to their production-ready versions.

The Tailwind production step is more complicated.  First, a Docker container is build to `npm install tailwindcss` and imports the settings found in the deploy folder.  Next, it reads all the source files to detect which CSS tags were used, and converts the "base.css" skeleton file into a "main.css" file.  The index.html file is updated to use this "main.css" file instead of the Tailwind CDN (using the same `sed` step that converted the Vue and Vuex paths).

# Example workflow

1. make some changes to the develop branch
2. run `make test` to run the test suite against the new changes
3. run `make merge` to merge the develop branch into main
4. run `make push` to push both develop and main up to origin
5. ... which will trigger a build at Jenkins

On the Jenkins server, the pipeline will also call `make test` and if that passes, will then:
- SSH into the production server
- run `git checkout .` to revert the production-related changes
- run `git pull` to get the new source files plus any new make commands
- run `make prod` to convert Vue, Vuex, and Tailwind imports into production-ready version

# Wishlist

- stats keeping
  - [vuex local storage](https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store/)
- Istanbul coverage?  (looks messy...)
- add testing for more browsers
- make sure green key doesn't turn to yellow

# Testing references

- [End to end testing with pyfixtures](https://www.lambdatest.com/blog/end-to-end-tutorial-for-pytest-fixtures-with-examples/)
- [Parameterizing pytests with Selenium](https://www.javacodegeeks.com/2021/04/how-to-do-parameterization-in-pytest-with-selenium.html)
- [Setting up XVFB with Chrome](https://stackoverflow.com/questions/41460168/what-is-difference-between-xvfb-and-chromedriver-and-when-to-use-them)

# Credit

- [5-letter word list](https://github.com/charlesreid1/five-letter-words/blob/master/sgb-words.txt)
- [Toggle button](https://codepen.io/lhermann/pen/EBGZRZ)
- [Tailwind modal overlay](https://tailwindui.com/components/application-ui/overlays/modals)
- [Git hook to specific branch](https://stackoverflow.com/questions/7351551/writing-a-git-post-receive-hook-to-deal-with-a-specific-branch)

# Developer notes

- Added git post-receive hook on server-side (not version controlled)