import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Proxies() {
  const [proxies, setProxies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProxies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://100.88.204.66:8000/api/proxy/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProxies(res.data);
      } catch (err) {
        console.error('Lỗi khi tải proxy:', err);
        setError("Không thể tải danh sách proxy. Vui lòng đăng nhập lại.");
      }
    };

    fetchProxies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Proxy</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">IP</th>
            <th className="border p-2">Port</th>
            <th className="border p-2">Loại</th>
            <th className="border p-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {proxies.map((proxy) => (
            <tr key={proxy.id} className="text-center">
              <td className="border p-2">{proxy.ip}</td>
              <td className="border p-2">{proxy.port}</td>
              <td className="border p-2">{proxy.type}</td>
              <td className="border p-2">{proxy.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
