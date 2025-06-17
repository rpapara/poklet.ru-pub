# 🛠 Poklet — Backend (Django + DRF)

This part of the project implements the backend of Poklet — the API and business logic for voting and session management.

Technologies used:

- **Python 3.11+**
- **Django**
- **Django REST Framework (DRF)**
- **PostgreSQL**
- **dotenv (.env)** for configuration

---

## 📁 Project Structure

```text
backend/
├── config/                    # Project settings
├── app/                       # Application code
├── .env                       # DB connection and secrets configuration
├── manage.py                  # Django utility
└── README.md                  # Backend documentation
```

---

## 🚀 Running the Project Locally

1. Navigate to the `backend` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

For development:

```bash
pip install -r requirements-dev.txt
```

3. Apply migrations:

```bash
python manage.py migrate
```

4. Run the server:

```bash
python manage.py runserver
```

The API will be available at [`http://localhost:8000/api/`](http://localhost:8000/api/)
