import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchaLandingPage from "./pages/MatchaLandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProductList from "./pages/ProductList";
import SalesSummary from "./pages/SalesSummary";
import TransactionList from "./pages/TransactionList";
import Settings from "./pages/Settings";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "@components/PrivateRoute.tsx";
import LoginRegisterRoute from "@components/LoginRegisterRoute.tsx";
// import LoginPage from "./pages/LoginPage"; // kalau nanti ada halaman lain

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<MatchaLandingPage />} />
        <Route path="/admin/login" element={<LoginRegisterRoute><AdminLogin /></LoginRegisterRoute>} />
        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/admin/sales" element={<PrivateRoute><SalesSummary /></PrivateRoute>} />
        <Route path="/admin/transactions" element={<PrivateRoute><TransactionList /></PrivateRoute>} />
        <Route path="/admin/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;