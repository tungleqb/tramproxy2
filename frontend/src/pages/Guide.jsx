import React from 'react';

export default function Guide() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Hướng dẫn sử dụng TramProxy</h2>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. Đăng ký và đăng nhập</h3>
        <p>
          Truy cập trang <a href="/register" className="text-blue-600 underline">Đăng ký</a> để tạo tài khoản mới. Sau đó, đăng nhập tại trang <a href="/login" className="text-blue-600 underline">Đăng nhập</a> bằng tên đăng nhập và mật khẩu của bạn.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">2. Nạp tiền vào tài khoản</h3>
        <p>
          Sau khi đăng nhập, truy cập vào <strong>Dashboard</strong>, chọn "Nạp tiền" từ menu avatar. Nhập số tiền và chọn phương thức thanh toán, sau đó nhấn "Nạp ngay".
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">3. Mua và dùng thử proxy</h3>
        <p>
          Trong Dashboard hoặc Trang chủ, bạn có thể thấy bảng giá proxy. Nhấn nút "Mua ngay" hoặc "Dùng thử" để đặt proxy. Nếu chưa có đủ số dư, hãy nạp tiền trước.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">4. Quản lý và gia hạn proxy</h3>
        <p>
          Truy cập mục <strong>Quản lý proxy</strong> để xem danh sách proxy bạn đang sử dụng. Bạn có thể lọc theo loại, trạng thái, quốc gia, thời gian hết hạn và thực hiện gia hạn hàng loạt.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">5. Xem lịch sử giao dịch</h3>
        <p>
          Truy cập mục <strong>Lịch sử giao dịch</strong> để xem các lần nạp tiền, phương thức và thời gian thực hiện.
        </p>
      </section>
    </div>
  );
}