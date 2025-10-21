import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchaLandingPage from "./pages/MatchaLandingPage";
// import LoginPage from "./pages/LoginPage"; // kalau nanti ada halaman lain

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MatchaLandingPage />} />

        {/* Contoh rute lain nanti */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;