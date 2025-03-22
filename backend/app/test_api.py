import requests

BASE_URL = "http://localhost:8000/api"

def register_user():
    data = {
        "username": "testuser",
        "password": "password123",
        "email": "test@example.com",
        "display_name": "Test User"
    }
    res = requests.post(f"{BASE_URL}/auth/register", json=data)
    print("Register:", res.status_code, res.json())

def login_user():
    data = {"username": "testuser", "password": "password123"}
    res = requests.post(f"{BASE_URL}/auth/login", json=data)
    print("Login:", res.status_code, res.json())
    return res.json().get("access_token")

def get_profile(token):
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/user/profile", headers=headers)
    print("Profile:", res.status_code, res.json())

def update_user(token):
    headers = {"Authorization": f"Bearer {token}"}
    data = {"display_name": "Updated User", "email": "updated@example.com"}
    res = requests.put(f"{BASE_URL}/user/update", headers=headers, json=data)
    print("Update:", res.status_code, res.json())

def list_proxies(token):
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/proxy/list", headers=headers)
    print("Proxy list:", res.status_code, res.json())

def buy_proxy(token):
    headers = {"Authorization": f"Bearer {token}"}
    data = {"type": "HTTP", "duration_days": 7}
    res = requests.post(f"{BASE_URL}/proxy/buy", headers=headers, json=data)
    print("Buy proxy:", res.status_code, res.json())

def renew_proxy(token, proxy_id):
    headers = {"Authorization": f"Bearer {token}"}
    data = {"proxy_id": proxy_id, "duration_days": 7}
    res = requests.post(f"{BASE_URL}/proxy/renew", headers=headers, json=data)
    print("Renew proxy:", res.status_code, res.json())

def deposit_money(token):
    headers = {"Authorization": f"Bearer {token}"}
    data = {"amount": 100000, "method": "bank_transfer"}
    res = requests.post(f"{BASE_URL}/payment/deposit", headers=headers, json=data)
    print("Deposit:", res.status_code, res.json())

def transaction_history(token):
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/transaction/history", headers=headers)
    print("Transaction history:", res.status_code, res.json())

if __name__ == "__main__":
    register_user()
    token = login_user()
    if token:
        get_profile(token)
        update_user(token)
        list_proxies(token)
        buy_proxy(token)
        deposit_money(token)
        transaction_history(token)
