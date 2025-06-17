import os
import sys
import requests

BASE_URL = "https://api-ms.netangels.ru"
TOKEN_URL = "https://panel.netangels.ru/api/gateway/token/"
VHOSTS_URL = f"{BASE_URL}/api/v1/hosting/virtualhosts/"


def get_token(api_key: str) -> str:
    print("Retrieving access token...")
    response = requests.post(TOKEN_URL, data={"api_key": api_key})
    response.raise_for_status()
    return response.json()["token"]


def list_sites(token: str):
    print("Retrieving list of virtual hosts...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(VHOSTS_URL, headers=headers)
    response.raise_for_status()
    data = response.json()
    for site in data.get("entities", []):
        print(f"{site['name']}: {site['id']}")


def main():
    api_key = os.getenv("NA_API_KEY")
    if len(sys.argv) > 1:
        api_key = sys.argv[1]
    if not api_key:
        print("API key not provided. Set NA_API_KEY env var or pass it as argument.")
        sys.exit(1)
    try:
        token = get_token(api_key)
        list_sites(token)
    except requests.HTTPError as e:
        print("HTTP error:", e.response.status_code, e.response.text)
        sys.exit(2)


if __name__ == "__main__":
    main()
