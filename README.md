# Overview

A portable (offline-playable) version of Wordle (https://www.powerlanguage.co.uk/wordle/) with unlimited plays and (in the future) RPG elements.  Written completely in Vue3 using Vuex and Tailwind CSS.

Currently hosted at:
- Main branch: https://wordfoo.foostarstudio.com
- Develop branch: https://wordfoo-staging.albertliang.xyz

# Development

Feel free to fork or open pull requests!

# Testing

Testing is done via Selenium in a Docker container:

```
cd testing/
docker-compose build
docker-compose up
# note, will automatically drop you into Python Debugger (pdb) when it hits the first FAIL
```

Testing is also done automatically by Jenkins when the `main` branch is updated on server-side.

# Wishlist

- Jenkins auto deploy
- stats keeping
- change vue and tailwind cdn based on prod/dev

# Testing wishlist

- test grid colors
- test white/gray/yellow/green
- test yellow to green override

# Testing references

- https://www.lambdatest.com/blog/end-to-end-tutorial-for-pytest-fixtures-with-examples/
- https://www.javacodegeeks.com/2021/04/how-to-do-parameterization-in-pytest-with-selenium.html
- https://stackoverflow.com/questions/41460168/what-is-difference-between-xvfb-and-chromedriver-and-when-to-use-them

# Credit

- Word list: https://github.com/charlesreid1/five-letter-words/blob/master/sgb-words.txt
- Toggle button: https://codepen.io/lhermann/pen/EBGZRZ
- Modal overlay: https://tailwindui.com/components/application-ui/overlays/modals

# Developer notes

- Added git post-receive hook on server-side (not version controlled)