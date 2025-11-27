import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="fixed w-full top-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-[--neon]">
          CivicConnect
        </Link>

        <nav className="flex items-center gap-6 text-gray-200">
          <Link to="/" className="hover:text-[--neon2]">Home</Link>
          <Link to="/map" className="hover:text-[--neon2]">Map</Link>
          {user?.role === "municipal" && (
            <Link to="/admin" className="hover:text-[--neon2]">
              Admin Panel
            </Link>
          )}
          {user ? (
            <>
              <Link to="/profile">{user.name}</Link>
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
