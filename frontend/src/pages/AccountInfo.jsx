import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AccountInfo() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios.get('http://100.88.204.66:8000/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setDisplayName(res.data.display_name || '');
                setEmail(res.data.email || '');
            })
            .catch(err => console.error('Lỗi tải thông tin người dùng:', err));
    }, []);

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.put('http://100.88.204.66:8000/api/user/update', {
                display_name: displayName,
                email
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage({ type: 'success', text: 'Cập nhật thông tin thành công.' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.detail || 'Lỗi cập nhật.' });
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Thông tin tài khoản</h2>

            {message && (
                <div className={`mb-4 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="displayName" className="block font-medium mb-1">Tên hiển thị</label>
                <input
                    id="displayName"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="border w-full p-2"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border w-full p-2"
                />
            </div>

            <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Cập nhật
            </button>
        </div>
    );
}
