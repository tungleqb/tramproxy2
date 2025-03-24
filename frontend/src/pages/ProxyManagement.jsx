import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProxyManagement() {
  const [proxies, setProxies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    status: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://100.88.204.66:8000/proxies/list', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProxies(res.data))
    .catch(err => console.error('Lỗi khi tải proxy:', err));
  }, []);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProxies = proxies.filter(p =>
    (filters.type === '' || p.type === filters.type) &&
    (filters.status === '' || p.status === filters.status)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Proxy</h1>

      <div className="flex space-x-4 mb-4">
        <select name="type" value={filters.type} onChange={handleFilterChange} className="border px-2 py-1">
          <option value="">Tất cả loại</option>
          <option value="HTTP">HTTP</option>
          <option value="SOCKS5">SOCKS5</option>
        </select>
        <select name="status" value={filters.status} onChange={handleFilterChange} className="border px-2 py-1">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">
                <input type="checkbox" onChange={(e) => {
                  if (e.target.checked) {
                    setSelected(filteredProxies.map(p => p.id));
                  } else {
                    setSelected([]);
                  }
                }} checked={selected.length === filteredProxies.length && filteredProxies.length > 0} />
              </th>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">IP</th>
              <th className="border px-2 py-1">Port</th>
              <th className="border px-2 py-1">Loại</th>
              <th className="border px-2 py-1">Trạng thái</th>
              <th className="border px-2 py-1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProxies.map(proxy => (
              <tr key={proxy.id} className="text-center">
                <td className="border px-2 py-1">
                  <input type="checkbox" checked={selected.includes(proxy.id)} onChange={() => toggleSelect(proxy.id)} />
                </td>
                <td className="border px-2 py-1">{proxy.id}</td>
                <td className="border px-2 py-1">{proxy.ip}</td>
                <td className="border px-2 py-1">{proxy.port}</td>
                <td className="border px-2 py-1">{proxy.type}</td>
                <td className="border px-2 py-1">{proxy.status}</td>
                <td className="border px-2 py-1">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Gia hạn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
