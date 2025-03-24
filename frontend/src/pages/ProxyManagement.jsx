import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProxyManagement() {
  const [proxies, setProxies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    country: '',
    expireInDays: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://100.88.204.66:8000/proxies/list', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const today = new Date();
      const updated = res.data.map(p => ({
        ...p,
        expire_at: p.expire_at || new Date().toISOString(),
        status: new Date(p.expire_at) < today ? 'expired' : p.status
      }));
      setProxies(updated);
    })
    .catch(err => console.error('Lỗi khi tải proxy:', err));
  }, []);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProxies = proxies.filter(p => {
    const matchType = filters.type === '' || p.type === filters.type;
    const matchStatus = filters.status === '' || p.status === filters.status;
    const matchCountry = filters.country === '' || p.country === filters.country;
    const matchExpire =
      filters.expireInDays === '' ||
      (new Date(p.expire_at) - new Date()) / (1000 * 60 * 60 * 24) < parseInt(filters.expireInDays);
    return matchType && matchStatus && matchCountry && matchExpire;
  });

  const renewSelected = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    selected.forEach(proxy_id => {
      axios.post('http://100.88.204.66:8000/proxies/renew', {
        proxy_id,
        duration_days: 7
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => console.log(`Gia hạn proxy ${proxy_id} thành công`))
      .catch(err => console.error('Lỗi gia hạn:', err));
    });
    alert(`Đã gửi yêu cầu gia hạn cho ${selected.length} proxy.`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Proxy</h1>

      <div className="flex flex-wrap gap-4 mb-4">
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
        <select name="country" value={filters.country} onChange={handleFilterChange} className="border px-2 py-1">
          <option value="">Tất cả quốc gia</option>
          <option value="VN">VN</option>
          <option value="US">US</option>
          <option value="SG">SG</option>
          <option value="JP">JP</option>
          <option value="KR">KR</option>
        </select>
        <select name="expireInDays" value={filters.expireInDays} onChange={handleFilterChange} className="border px-2 py-1">
          <option value="">Hạn còn lại</option>
          <option value="1">Dưới 1 ngày</option>
          <option value="3">Dưới 3 ngày</option>
          <option value="7">Dưới 7 ngày</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={renewSelected}>
          Gia hạn đã chọn ({selected.length})
        </button>
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
              <th className="border px-2 py-1">Quốc gia</th>
              <th className="border px-2 py-1">Hết hạn</th>
              <th className="border px-2 py-1">Trạng thái</th>
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
                <td className="border px-2 py-1">{proxy.country || 'N/A'}</td>
                <td className="border px-2 py-1">{new Date(proxy.expire_at).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{proxy.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}