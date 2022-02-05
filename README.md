# Overview

A portable (offline-playable) version of Wordle (https://www.powerlanguage.co.uk/wordle/) with unlimited plays and (in the future) RPG elements.  Written completely in Vue3 using Vuex and Tailwind CSS.

Currently hosted at:
- Main branch: https://wordfoo.foostarstudio.com
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

Testing is done via Selenium (in a Docker container) against the staging instance.  This means that testing is done against the `develop` branch, with the assumption that it is identical to the `main` branch.  This may not hold true if you don't remember to merge `develop` into `main`.  (You can do that via `make merge_main`.)

```
# using Makefile
make build_tests
make run_tests
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

Testing is also done automatically by Jenkins when the `main` branch is updated on server-side by hitting a specific Jenkins project URL with `curl -X POST` via a Git post-receive hook.

```
# Example git hook (.git/hooks/post-receive)
# Note: this must be installed server-side, not client-side
#!/bin/bash

while read oldrev newrev refname
do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)
    if [ "main" = "$branch" ]; then
        curl -X POST 'http://<USER>:<API_KEY>@<JENKINS_PROJECT_URL_HERE>'
    fi
done
```

# Wishlist

- Jenkins auto deploy
- stats keeping
- change vue and tailwind cdn based on prod/dev
- plausible.io tracking
- vuex local storage
  - https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store/

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