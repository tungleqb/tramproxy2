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
      await axios.post('http://localhost:8000/auth/register', {
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
      <input name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} className="border px-4 py-2 mb-2 w-full max-w-sm" />
      <input name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} className="border px-4 py-2 mb-2 w-full max-w-sm" />
      <input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={handleChange} className="border px-4 py-2 mb-2 w-full max-w-sm" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border px-4 py-2 mb-2 w-full max-w-sm" />
      <input name="display_name" placeholder="Tên hiển thị" value={form.display_name} onChange={handleChange} className="border px-4 py-2 mb-2 w-full max-w-sm" />
      <input name="referral_code" placeholder="Mã giới thiệu (nếu có)" value={form.referral_code} onChange={handleChange} className="border px-4 py-2 mb-4 w-full max-w-sm" />
      <button onClick={handleRegister} className="bg-indigo-600 text-white px-6 py-2 rounded">Đăng ký</button>
    </div>
  );
}
