import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Proxies from './Proxies';
import ProxyManagement from './ProxyManagement';
import Deposit from './Deposit';
import TransactionHistory from './TransactionHistory';
import BuyProxy from './BuyProxy';
import AccountInfo from './AccountInfo';
import ReferralCode from './ReferralCode';
import Guide from './Guide';

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
