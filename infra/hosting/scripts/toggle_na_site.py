# File: infra/hosting/scripts/toggle_na_site.py

import os
import sys
import requests

BASE_URL = "https://api-ms.netangels.ru/api/v1"


def get_token(api_key: str):
    response = requests.post(
        "https://panel.netangels.ru/api/gateway/token/", data={"api_key": api_key}
    )
    response.raise_for_status()
    return response.json()["token"]


def set_site_enabled(token: str, vhost_id: str, enabled: bool):
    headers = {"Authorization": f"Bearer {token}"}
    action = "enable" if enabled else "disable"
    url = f"{BASE_URL}/hosting/virtualhosts/{vhost_id}/{action}/"
    response = requests.put(url, headers=headers)
    response.raise_for_status()
    print(f"{'✔️ Enabled' if enabled else '❌ Disabled'} virtual host {vhost_id}")


if __name__ == "__main__":
    print(len(sys.argv), sys.argv)
    if len(sys.argv) < 3 or sys.argv[1] not in ("enable", "disable"):
        print(
            "Usage: python toggle_site.py <enable|disable> <vhost_id> [optional_api_key]"
        )
        sys.exit(1)

    api_key = os.getenv("NA_API_KEY")
    if len(sys.argv) > 3:
        api_key = sys.argv[3]

    enabled_flag = sys.argv[1] == "enable"
    vhost_id = sys.argv[2]
    token = get_token(api_key)
    set_site_enabled(token, vhost_id, enabled_flag)
