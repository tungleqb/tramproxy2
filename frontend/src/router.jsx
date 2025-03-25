import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Proxies from './pages/Proxies';
import ProxyManagement from './pages/ProxyManagement';
import Deposit from './pages/Deposit';
import TransactionHistory from './pages/TransactionHistory';
import BuyProxy from './pages/BuyProxy';
import AccountInfo from './pages/AccountInfo';
import ReferralCode from './pages/ReferralCode';
import Guide from './pages/Guide';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proxies" element={<Proxies />} />
        <Route path="/proxy-management" element={<ProxyManagement />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/buy-proxy" element={<BuyProxy />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/referral" element={<ReferralCode />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </BrowserRouter>
  );
}
