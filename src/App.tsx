import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchaLandingPage from "./pages/MatchaLandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProductList from "./pages/ProductList";
import SalesSummary from "./pages/SalesSummary";
import TransactionList from "./pages/TransactionList";
import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage"; // kalau nanti ada halaman lain

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MatchaLandingPage />} />
        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/sales" element={<SalesSummary />} />
        <Route path="/admin/transactions" element={<TransactionList />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;