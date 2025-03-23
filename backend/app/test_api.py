import requests

BASE_URL = "http://100.88.204.66:8000"

# Helper để in kết quả
print_section = lambda title: print(f"\n=== {title} ===")

def register_user():
    print_section("Register")
    data = {
        "username": "testuser",
        "password": "password123",
        "email": "test@example.com",
        "display_name": "Test User"
    }
    res = requests.post(f"{BASE_URL}/auth/register", json=data)
    print(res.status_code, res.json())

def login_user():
    print_section("Login")
    data = {"username": "testuser", "password": "password123"}
    res = requests.post(f"{BASE_URL}/auth/login", json=data)
    print(res.status_code, res.json())
    return res.json().get("access_token")

def get_profile(token):
    print_section("Get Profile")
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/users/profile", headers=headers)
    print(res.status_code, res.json())

def update_user(token):
    print_section("Update Profile")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"display_name": "Updated Name", "email": "new@example.com"}
    res = requests.put(f"{BASE_URL}/users/update", headers=headers, json=data)
    print(res.status_code, res.json())

def list_proxies(token):
    print_section("List Proxies")
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/proxies/list", headers=headers)
    print(res.status_code, res.json())

def buy_proxy(token):
    print_section("Buy Proxy")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"type": "HTTP", "duration_days": 7}
    res = requests.post(f"{BASE_URL}/proxies/buy", headers=headers, json=data)
    print(res.status_code, res.json())
    return res.json().get("proxy_id")

def renew_proxy(token, proxy_id):
    print_section("Renew Proxy")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"proxy_id": proxy_id, "duration_days": 7}
    res = requests.post(f"{BASE_URL}/proxies/renew", headers=headers, json=data)
    print(res.status_code, res.json())

def deposit(token):
    print_section("Deposit")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"amount": 50000, "method": "bank_transfer"}
    res = requests.post(f"{BASE_URL}/payment/deposit", headers=headers, json=data)
    print(res.status_code, res.json())

def transaction_history(token):
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/payment/transaction/history", headers=headers)
    print("Transaction history:", res.status_code, res.json())

def logout_user():
    print_section("Logout")
    res = requests.post(f"{BASE_URL}/auth/logout")
    print(res.status_code, res.json())

if __name__ == "__main__":
    register_user()
    token = login_user()
    if token:
        get_profile(token)
        update_user(token)
        list_proxies(token)
        proxy_id = buy_proxy(token)
        if proxy_id:
            renew_proxy(token, proxy_id)
        deposit(token)
        transaction_history(token)
        logout_user()
