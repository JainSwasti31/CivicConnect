import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 glass">
      <div className="max-w-7xl mx-auto h-full px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-[--neon]">
          CivicConnect
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-200">

          <Link to="/" className="hover:text-[--neon2]">Home</Link>

          {/* Show My Issues for logged-in users */}
          {user && user.role === "citizen" && (
            <Link to="/my-issues" className="hover:text-[--neon2]">
              My Issues
            </Link>
          )}

          {/* Admin Panel for Municipal */}
          {user?.role === "municipal" && (
            <Link to="/admin" className="hover:text-[--neon2]">
              Admin Panel
            </Link>
          )}

          {/* Auth Section */}
          {user ? (
            <>
              <span className="text-sm text-gray-300">
                {user.name}
              </span>
              <button
                onClick={() => {
                  logout();
                  nav("/login");
                }}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-neon text-midnight rounded-full font-semibold shadow hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}