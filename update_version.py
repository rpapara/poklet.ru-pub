import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

VERSION_FILE = Path(__file__).parent / "version.json"


def get_git_hash():
    try:
        return (
            subprocess.check_output(["git", "rev-parse", "--short", "HEAD"])
            .decode()
            .strip()
        )
    except subprocess.CalledProcessError:
        return "unknown"


def update_version():
    with open(VERSION_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    data["build"] += 1
    data["commit"] = get_git_hash()
    data["date"] = datetime.now(timezone.utc).isoformat(timespec="seconds")

    with open(VERSION_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(
        f"✅ Updated version {data['version']}+{data['build']} ({data['commit']}) at {data['date']}"
    )

    FRONTEND_VERSION_FILE = (
        Path(__file__).parent / "frontend" / "public" / "version.json"
    )
    with open(FRONTEND_VERSION_FILE, "w", encoding="utf-8") as f_ts:
        json.dump(data, f_ts, indent=2)
    print(f"✅ Written frontend/public/version.json")

    BACKEND_VERSION_FILE = Path(__file__).parent / "backend" / "config" / "version.py"
    with open(BACKEND_VERSION_FILE, "w", encoding="utf-8") as f_py:
        f_py.write(
            f"# Auto-generated version info\n"
            f"version_info = {{\n"
            f"    'version': '{data['version']}',\n"
            f"    'build': {data['build']},\n"
            f"    'commit': '{data['commit']}',\n"
            f"    'date': '{data['date']}'\n"
            f"}}\n"
        )
    print(f"✅ Written backend/version.py")


if __name__ == "__main__":
    update_version()
