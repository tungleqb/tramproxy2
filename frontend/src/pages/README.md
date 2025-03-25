# 🚀 TramProxy

**TramProxy** là một nền tảng cung cấp dịch vụ proxy (HTTP/SOCKS5) cho khách hàng, với giao diện đơn giản, dễ dùng, tích hợp thanh toán và quản lý proxy.

---

## 📦 Tính năng chính

### 👤 Người dùng
- Đăng ký, đăng nhập (có mã giới thiệu)
- Quản lý tài khoản, đổi mật khẩu, xem số dư

### 🧾 Proxy
- Mua proxy (HTTP/SOCKS5)
- Dùng thử proxy
- Quản lý danh sách proxy đã mua
- Lọc proxy theo loại, trạng thái, quốc gia, hạn sử dụng
- Gia hạn nhiều proxy cùng lúc

### 💳 Thanh toán
- Nạp tiền với nhiều phương thức (bank, momo, paypal)
- Xem lịch sử giao dịch

---

## 🖥️ Frontend

- **Công nghệ:** React + Vite + TailwindCSS
- **Thư mục chính:** `frontend/src/pages/`
- **Các trang đã triển khai:**
  - `Login.jsx`, `Register.jsx`
  - `Dashboard.jsx`: thông tin user + bảng giá + nạp tiền
  - `ProxyManagement.jsx`: danh sách & lọc proxy
  - `TransactionHistory.jsx`: hiển thị lịch sử nạp tiền
  - `Guide.jsx`: hướng dẫn sử dụng

---

## 🧪 Backend (FastAPI)

- Chuẩn REST API
- Token xác thực JWT
- Gồm các route:
  - `/api/auth/register`, `/login`, `/logout`
  - `/api/user/profile`, `/update`
  - `/api/proxy/list`, `/buy`, `/renew`
  - `/api/payment/deposit`, `/history`

---

## 📂 Cấu trúc thư mục

```
tramproxy/
├── backend/
│   ├── app/
│   │   ├── main.py, models.py, schemas.py, crud.py, database.py
│   │   └── routers/
│   │       ├── auth_router.py, users_router.py, proxy_router.py, payment_router.py
│   └── test_api.py
│
├── frontend/
│   └── src/pages/ (React components chính)
│
├── docker/
│   ├── Dockerfile.backend, Dockerfile.frontend, docker-compose.yml
└── README.md
```

---

## 🛠️ Cài đặt nhanh

```bash
# Backend
cd backend
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

---

## 📌 Tác giả
- Dự án được phát triển bởi team TramProxy.
- Mọi góp ý hoặc hợp tác vui lòng liên hệ qua form liên hệ trong trang chính.