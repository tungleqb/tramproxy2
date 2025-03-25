import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://100.88.204.66:8000/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      alert('Đăng nhập thất bại');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
      <div className="w-full max-w-sm">
        <label htmlFor="username" className="block mb-1 font-medium">Tên đăng nhập</label>
        <input id="username" type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} className="border px-4 py-2 mb-4 w-full" />

        <label htmlFor="password" className="block mb-1 font-medium">Mật khẩu</label>
        <input id="password" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-4 py-2 mb-4 w-full" />

        <button onClick={handleLogin} className="bg-indigo-600 text-white px-6 py-2 rounded w-full">Đăng nhập</button>
        <p className="mt-4 text-center">
          Chưa có tài khoản? <a href="/register" className="text-blue-600 underline">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}