# Overview

A portable (offline-playable) version of Wordle (https://www.powerlanguage.co.uk/wordle/) with unlimited plays and (in the future) RPG elements.  Written completely in Vue3 using Vuex and Tailwind CSS.

# Development

Feel free to fork or open pull requests!

# Testing

Testing is done via Selenium and is located in the selenium_testing folder.

Setup steps:
```
python3 -m venv venv
. venv/bin/activate
python3 -m pip install --upgrade pip
pip install wheel
pip install -r requirements.txt
pytest test_game.py
```

# Wishlist

- stats keeping
- seed in get param to sync up game with friend
- change vue and tailwind cdn based on prod/dev
- type with keyboard instead of touch screen
- refactor mixins into multiple files?

# Testing wishlist

- find a way to run tests on headless server and/or Docker container
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
