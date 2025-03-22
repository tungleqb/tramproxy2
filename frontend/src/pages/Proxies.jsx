import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Proxies() {
  const [proxies, setProxies] = useState([]);

  useEffect(() => {
    axios.get('http://100.88.204.66:8000/proxies')
      .then((res) => setProxies(res.data))
      .catch((err) => console.error('Lỗi khi tải proxy:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Proxy</h1>
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
          {proxies.map((proxy, index) => (
            <tr key={index} className="text-center">
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

