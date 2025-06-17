# config/load_env.py
import os


def normalize_env():
    mappings = {
        "DBUSER": "DB_USER",
        "DBPASS": "DB_PASSWORD",
        "DBHOST": "DB_HOST",
        "DBNAME": "DB_NAME",
    }

    for source_key, target_key in mappings.items():
        if source_key in os.environ and target_key not in os.environ:
            os.environ[target_key] = os.environ[source_key]
