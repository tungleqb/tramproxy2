import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://100.88.204.66:8000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error('Lỗi khi tải profile:', err));
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
              <li onClick={() => handleNavigate('/account-info')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Thông tin tài khoản</li>
              <li onClick={() => handleNavigate('/referral')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Mã giới thiệu</li>
              <li onClick={() => handleNavigate('/deposit')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Nạp tiền</li>
              <li onClick={() => handleNavigate('/buy-proxy')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Mua proxy</li>
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Đăng xuất</li>
            </ul>
          )}
        </div>
      </div>

      <div className="mb-4 text-lg">
        <span className="font-medium">Số dư:</span> {profile?.balance?.toLocaleString() || '0'} VNĐ
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Bảng giá Proxy</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">HTTP Proxy</h3>
            <p className="text-sm">Tốc độ cao, dễ cấu hình</p>
            <p className="mt-2 text-blue-600 font-semibold">20.000đ / 1 ngày</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleNavigate('/buy-proxy')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Mua ngay</button>
              <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Dùng thử</button>
            </div>
          </div>
          <div className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">SOCKS5 Proxy</h3>
            <p className="text-sm">Bảo mật cao, hỗ trợ nhiều giao thức</p>
            <p className="mt-2 text-blue-600 font-semibold">30.000đ / 1 ngày</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleNavigate('/buy-proxy')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Mua ngay</button>
              <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Dùng thử</button>
            </div>
          </div>
          <div className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">Proxy VIP</h3>
            <p className="text-sm">IP sạch, tốc độ cao nhất</p>
            <p className="mt-2 text-blue-600 font-semibold">100.000đ / 3 ngày</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleNavigate('/buy-proxy')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Mua ngay</button>
              <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Dùng thử</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
