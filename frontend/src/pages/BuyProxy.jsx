import React, { useState } from 'react';
import axios from 'axios';

export default function BuyProxy() {
    const [type, setType] = useState('HTTP');
    const [duration, setDuration] = useState(1);
    const [message, setMessage] = useState(null);

    const handleBuy = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage({ type: 'error', text: 'Bạn chưa đăng nhập.' });
            return;
        }

        try {
            const res = await axios.post('http://100.88.204.66:8000/api/proxy/buy', {
                type,
                duration_days: duration
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage({ type: 'success', text: res.data.message });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.detail || 'Lỗi khi mua proxy.' });
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Mua Proxy</h2>

            {message && (
                <div className={`mb-4 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="type" className="block font-medium mb-1">Loại Proxy</label>
                <select
                    id="type"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="border w-full p-2"
                >
                    <option value="HTTP">HTTP</option>
                    <option value="SOCKS5">SOCKS5</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="duration" className="block font-medium mb-1">Số ngày sử dụng</label>
                <input
                    id="duration"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="border w-full p-2"
                />
            </div>

            <button
                onClick={handleBuy}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Mua ngay
            </button>
        </div>
    );
}
