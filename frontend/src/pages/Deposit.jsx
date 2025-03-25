import React, { useState } from 'react';
import axios from 'axios';

export default function Deposit() {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('bank_transfer');
    const [message, setMessage] = useState(null);

    const handleDeposit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage({ type: 'error', text: 'Bạn chưa đăng nhập.' });
            return;
        }

        try {
            const res = await axios.post('http://100.88.204.66:8000/api/payment/deposit', {
                amount: parseInt(amount),
                method
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage({ type: 'success', text: res.data.message });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.detail || 'Lỗi nạp tiền.' });
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Nạp tiền vào tài khoản</h2>

            {message && (
                <div className={`mb-4 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="amount" className="block font-medium mb-1">Số tiền (VND)</label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Nhập số tiền..."
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="border w-full p-2"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="method" className="block font-medium mb-1">Phương thức thanh toán</label>
                <select
                    id="method"
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="border w-full p-2"
                >
                    <option value="bank_transfer">Chuyển khoản ngân hàng</option>
                    <option value="momo">Momo</option>
                    <option value="zalopay">ZaloPay</option>
                </select>
            </div>

            <button
                onClick={handleDeposit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Nạp tiền
            </button>
        </div>
    );
}
