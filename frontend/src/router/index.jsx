import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Proxies from '../pages/Proxies';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Proxies />} />
      </Routes>
    </BrowserRouter>
  );
}

