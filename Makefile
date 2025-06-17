
update-project-structure-full:
	@echo "Updating project structure..."
	@rm -f project-structure.txt
	@tree -a -I 'node_modules|__pycache__|*.pyc|*.log|*.sqlite3|*.env|.git|venv|dist|build|.history|.venv|.mypy_cache|backend.log*' -L 4 > project-structure.txt
	@echo "Project structure updated in project-structure.txt"

update-project-structure-higl-level:
	@echo "Updating project structure..."
	@rm -f project-structure.txt
	@tree -a -F -I 'node_modules|__pycache__|*.pyc|*.log|*.sqlite3|*.env|.git|venv|dist|build|.history|.venv|.mypy_cache|backend.log*|docs|.DS_Store' -L 3 > project-structure-high-level.txt
	@echo "Project structure updated in project-structure.txt"

update-version:
	@echo "Updating version..."
	@python update_version.py
	@echo "Version updated"

check-files-with-russian-letters:
	@echo "Checking for files with Russian letters..." 
	@find . \( -path './.venv' -o -path './.history' -o -path './frontend/node_modules' -o -path './dist' -o -path './frontend/dist' -o -path './docs' -o -path './backend/staticfiles' -o -path './.git' \) -prune -o -type f -print | xargs grep -Il '[а-яА-ЯёЁ]'