import requests
import os

keys = [
    "AIzaSyDq5qPM9DIsReY4qwMMBPYaiAye1Hm9X78",
    "mu_UIqmb8yZJ5_x847DRBsKT1uFvb9lmqG64cI-MvlgU8YkwBrHUu-7szZi9IUiZRQO-qj02OZgQJ5N8viQYbuARI9Rudwx2xpR3k1Clg"
]

def check_key(api_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f"Key {api_key[:10]}... is VALID")
            return True
        else:
            print(f"Key {api_key[:10]}... is INVALID (Status: {response.status_code})")
            print(response.text[:100])
            return False
    except Exception as e:
        print(f"Key {api_key[:10]}... Error: {e}")
        return False

print("Checking keys...")
valid_keys = []
for k in keys:
    if check_key(k):
        valid_keys.append(k)

print(f"Valid keys found: {len(valid_keys)}")
