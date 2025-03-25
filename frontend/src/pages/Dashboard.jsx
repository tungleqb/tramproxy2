import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank_transfer');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://100.88.204.66:8000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error('Lỗi khi tải profile:', err));
  }, []);

  const handleDeposit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.post('http://100.88.204.66:8000/api/payment/deposit', {
        amount: parseInt(amount),
        method
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Nạp tiền thành công!');
      setAmount('');
      setShowDepositForm(false);
    } catch (err) {
      console.error(err);
      alert('Nạp tiền thất bại.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Xin chào, {profile?.display_name || '---'}</h1>
        <div className="relative">
          <img
            src="/vite.svg"
            alt="avatar"
            className="w-10 h-10 rounded-full border cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <ul className="absolute right-0 top-12 bg-white border rounded shadow-md text-sm z-10">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Thông tin tài khoản</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Mã giới thiệu</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setShowDepositForm(true)}>Nạp tiền</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Đổi mật khẩu</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}>Đăng xuất</li>
            </ul>
          )}
        </div>
      </div>

      <div className="mb-4 text-lg">
        <span className="font-medium">Số dư:</span> {profile?.balance?.toLocaleString() || '0'} VNĐ
      </div>

      {showDepositForm && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Nạp tiền</h3>
          <input
            type="number"
            placeholder="Số tiền (VNĐ)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-3 py-2 mb-2 w-full max-w-sm"
          />
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border px-3 py-2 mb-2 w-full max-w-sm"
          >
            <option value="bank_transfer">Chuyển khoản ngân hàng</option>
            <option value="momo">Ví Momo</option>
            <option value="paypal">Paypal</option>
          </select>
          <button
            onClick={handleDeposit}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Nạp ngay
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Bảng giá Proxy</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">HTTP Proxy</h3>
            <p className="text-sm">Tốc độ cao, dễ cấu hình</p>
            <p className="mt-2 text-blue-600 font-semibold">20.000đ / 1 ngày</p>
            <div className="mt-2 flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Mua ngay</button>
              <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Dùng thử</button>
            </div>
          </div>
          <div className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">SOCKS5 Proxy</h3>
            <p className="text-sm">Bảo mật cao, hỗ trợ nhiều giao thức</p>
            <p className="mt-2 text-blue-600 font-semibold">30.000đ / 1 ngày</p>
            <div className="mt-2 flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Mua ngay</button>
              <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Dùng thử</button>
            </div>
          </div>
          <div className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">Proxy VIP</h3>
            <p className="text-sm">IP sạch, tốc độ cao nhất</p>
            <p className="mt-2 text-blue-600 font-semibold">100.000đ / 3 ngày</p>
            <div className="mt-2 flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Mua ngay</button>
              <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Dùng thử</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}