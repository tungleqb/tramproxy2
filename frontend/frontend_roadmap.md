# 📘 TramProxy Frontend Roadmap

## 🎯 MỤC TIÊU PHẦN FRONTEND
Xây dựng giao diện website để khách hàng có thể:
1. Đăng ký, đăng nhập, quản lý tài khoản
2. Mua và quản lý proxy
3. Nạp tiền và xem lịch sử giao dịch
4. Trải nghiệm UI/UX đơn giản, trực quan

---

## ✅ DANH SÁCH CÁC BƯỚC CẦN THỰC HIỆN

### I. Hoàn thiện các trang chính

#### 1. Trang chủ (Home)
- Logo TramProxy
- Menu: Trang chủ, Hướng dẫn, Đăng nhập, Đăng ký
- Bảng giá proxy: loại, mô tả, giá, nút mua/dùng thử
- Chọn ngôn ngữ (vi/en)

#### 2. Trang đăng ký (Register)
- Form: Tên đăng nhập, mật khẩu, nhập lại mật khẩu, email, tên hiển thị, mã giới thiệu
- Đăng ký bằng Google

#### 3. Trang đăng nhập (Login)
- Form: Tên đăng nhập, mật khẩu
- Link: Quên mật khẩu, Đăng ký mới
- Đăng nhập bằng Google

#### 4. Trang quản lý tài khoản (Dashboard)
- Hiển thị avatar, tên người dùng, số dư tài khoản
- Menu mở rộng khi click avatar:
  + Thông tin tài khoản
  + Đổi mật khẩu
  + Nạp tiền
  + Mã giới thiệu
  + Đăng xuất
- Bảng giá proxy (tương tự trang chủ)

#### 5. Trang quản lý proxy
- Bảng thông tin proxy: IP, Port, Username, Password, Quốc gia, Loại Proxy, Thời gian hết hạn
- Nút gia hạn
- Các bộ lọc theo loại, quốc gia, trạng thái

---

### II. Kết nối với API Backend
- Gọi các API:
  + `/api/auth/register`
  + `/api/auth/login`
  + `/api/user/profile`
  + `/api/proxies/list`
  + `/api/proxies/buy`
  + `/api/proxies/renew`
  + `/api/payment/deposit`
  + `/api/transaction/history`
- Lưu token đăng nhập bằng `localStorage` hoặc `cookies`
- Gửi token qua header `Authorization` khi gọi các API cần xác thực

---

### III. Cải thiện UX/UI
- Hiển thị thông báo lỗi/thành công khi thực hiện các thao tác (mua proxy, đăng ký...)
- Loading spinner trong khi chờ phản hồi từ API
- Responsive layout: hỗ trợ hiển thị tốt cả desktop và mobile

