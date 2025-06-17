# 📦 Poklet — Infrastructure (infra/)

This section of the project contains everything needed for local and future production deployment of Poklet.

## 📁 Folder Structure

```text
infra/
├── docker-compose.full.yml   # Runs backend, frontend, and PostgreSQL
├── docker-compose.dev.yml    # Runs PostgreSQL; frontend and backend run locally
├── env/
│   └── .env                  # Environment variables for PostgreSQL
├── db/                       # Local PostgreSQL data (volume)
│   └── ...
└── README.md                 # Description of current structure and instructions
```

## 🚀 Quick Start

Useful commands are described in the Makefile.

## ⚙️ Environment Variables (env/.env)

Example contents of the `infra/env/.env` file:

```env
POSTGRES_DB=poklet_db
POSTGRES_USER=poklet_user
POSTGRES_PASSWORD=poklet_pass
POSTGRES_PORT=5432
```
