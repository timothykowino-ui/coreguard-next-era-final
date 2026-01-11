import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Subscribe from "./pages/Subscribe";
import Subscribed from "./pages/Subscribed";
import Unsubscribed from "./pages/Unsubscribed";
import TokenExpired from "./pages/TokenExpired";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/subscribed" element={<Subscribed />} />
        <Route path="/unsubscribed" element={<Unsubscribed />} />
        <Route path="/token-expired" element={<TokenExpired />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
