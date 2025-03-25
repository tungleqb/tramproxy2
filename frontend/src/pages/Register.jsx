import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    display_name: '',
    referral_code: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    try {
      await axios.post('http://100.88.204.66:8000/api/auth/register', {
        username: form.username,
        password: form.password,
        email: form.email,
        display_name: form.display_name,
        referral_code: form.referral_code || undefined
      });
      alert('Đăng ký thành công');
      navigate('/login');
    } catch (err) {
      alert('Đăng ký thất bại');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
      <div className="w-full max-w-sm">
        <label htmlFor="username" className="block mb-1 font-medium">Tên đăng nhập</label>
        <input id="username" name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} className="border px-4 py-2 mb-2 w-full" />

        <label htmlFor="password" className="block mb-1 font-medium">Mật khẩu</label>
        <input id="password" name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} className="border px-4 py-2 mb-2 w-full" />

        <label htmlFor="confirmPassword" className="block mb-1 font-medium">Nhập lại mật khẩu</label>
        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={handleChange} className="border px-4 py-2 mb-2 w-full" />

        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input id="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border px-4 py-2 mb-2 w-full" />

        <label htmlFor="display_name" className="block mb-1 font-medium">Tên hiển thị</label>
        <input id="display_name" name="display_name" placeholder="Tên hiển thị" value={form.display_name} onChange={handleChange} className="border px-4 py-2 mb-2 w-full" />

        <label htmlFor="referral_code" className="block mb-1 font-medium">Mã giới thiệu (nếu có)</label>
        <input id="referral_code" name="referral_code" placeholder="Mã giới thiệu (nếu có)" value={form.referral_code} onChange={handleChange} className="border px-4 py-2 mb-4 w-full" />

        <button onClick={handleRegister} className="bg-indigo-600 text-white px-6 py-2 rounded w-full">Đăng ký</button>
      </div>
    </div>
  );
}
