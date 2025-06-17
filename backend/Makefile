run-dev:
	python manage.py runserver

lint:
	flake8 .

check-types:
	mypy .

format:
	black .
	isort .

build:
	python manage.py collectstatic --noinput
	zip -r ../dist/backend.zip . \
			-x "*.pyc" \
			-x "__pycache__/*" \
			-x ".git/*" \
			-x ".venv/*" \
			-x "logs/*.log*" \
			-x "tests/*" \
			-x "frontend/*" \
			-x "infra/*" \
			-x ".mypy_cache/*" \
			-x ".env*" \
			logs/