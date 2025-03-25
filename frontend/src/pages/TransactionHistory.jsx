import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Bạn cần đăng nhập để xem lịch sử.');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('http://100.88.204.66:8000/api/payment/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(res.data);
      } catch (err) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Mã GD</th>
              <th className="border px-2 py-1">Số tiền (VNĐ)</th>
              <th className="border px-2 py-1">Phương thức</th>
              <th className="border px-2 py-1">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id} className="text-center">
                <td className="border px-2 py-1">{txn.id}</td>
                <td className="border px-2 py-1">{txn.amount.toLocaleString()}</td>
                <td className="border px-2 py-1">{txn.method}</td>
                <td className="border px-2 py-1">{new Date(txn.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
