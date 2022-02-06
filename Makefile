build_tests:
	@cd testing/; USERID=$(id -u) GROUPID=$(id -g) docker-compose build

test:
	@cd testing/; USERID=$(id -u) GROUPID=$(id -g) docker-compose up

merge:
	@git checkout main; git merge develop; git checkout develop
	@echo 'merged develop branch into main branch, run "make push" to sync to remote'

push:
	@git push --all

prod:
	@sed -i \
		-e 's/vue.global.js/vue.global.prod.js/' \
		-e 's/vuex.global.js/vuex.global.prod.js/' \
		-e '/script.*tailwind/d' \
		-e '/tailwind/a <link rel="stylesheet" href="./css/main.css">' \
		index.html

prod2:
	@docker build -f deploy/Dockerfile -t wordfoo_deploy .
	@docker run -v css:/app/code/output wordfoo_deploy:latest