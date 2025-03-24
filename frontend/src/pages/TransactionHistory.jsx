import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://100.88.204.66:8000/api/payment/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTransactions(res.data))
      .catch(err => console.error('Lỗi khi tải lịch sử giao dịch:', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h2>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Mã GD</th>
            <th className="border p-2">Số tiền</th>
            <th className="border p-2">Phương thức</th>
            <th className="border p-2">Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn.id}>
              <td className="border p-2">{txn.id}</td>
              <td className="border p-2">{txn.amount.toLocaleString()}đ</td>
              <td className="border p-2">{txn.method}</td>
              <td className="border p-2">{new Date(txn.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
