build_tests:
	@cd testing/; USERID=$(id -u) GROUPID=$(id -g) docker-compose build

test:
	@cd testing/; USERID=$(id -u) GROUPID=$(id -g) docker-compose up

merge:
	@git checkout main; git merge develop; git checkout develop
	@echo 'merged develop branch into main branch, run "git push --all" to sync to remote'