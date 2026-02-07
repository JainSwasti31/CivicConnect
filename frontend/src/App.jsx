import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Report from "./pages/Report";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import MapPage from "./pages/MapPage";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import MunicipalMap from "./pages/MunicipalMap.jsx";
import MyIssues from "./pages/MyIssues.jsx";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<Report />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/municipal-map" element={<MunicipalMap />} />
          <Route path="/my-issues" element={<MyIssues />} />
        </Routes>
      </div>

      {!isHome && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col overflow-hidden">
          <Layout />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}