import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="text-2xl font-bold text-indigo-600">TramProxy</div>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <Link to="/guide" className="hover:underline">Hướng dẫn</Link>
          <Link to="/login" className="hover:underline">Đăng nhập</Link>
          <Link to="/register" className="hover:underline">Đăng ký</Link>
        </nav>
      </header>

      {/* Pricing Section */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Bảng giá Proxy</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">HTTP Proxy</h2>
            <p className="mb-2">Tốc độ cao, dễ cấu hình</p>
            <p className="mb-4 font-bold">20.000đ / 1 ngày</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded mb-2 w-full">Mua ngay</button>
            <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded w-full">Dùng thử</button>
          </div>
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">SOCKS5 Proxy</h2>
            <p className="mb-2">Bảo mật cao, hỗ trợ nhiều giao thức</p>
            <p className="mb-4 font-bold">30.000đ / 1 ngày</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded mb-2 w-full">Mua ngay</button>
            <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded w-full">Dùng thử</button>
          </div>
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Proxy VIP</h2>
            <p className="mb-2">IP sạch, tốc độ cao nhất</p>
            <p className="mb-4 font-bold">100.000đ / 3 ngày</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded mb-2 w-full">Mua ngay</button>
            <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded w-full">Dùng thử</button>
          </div>
        </div>
      </main>
    </div>
  );
}
