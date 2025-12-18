import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(
        e.target.email.value,
        e.target.password.value
      );

      nav(user.role === "municipal" ? "/admin" : "/report");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    // 🔑 FULL PAGE CENTERING (NAVBAR SAFE)
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 glass rounded-xl border border-white/20">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="w-full p-3 bg-white text-black rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[--neon]"
            placeholder="Email"
            required
          />

          <input
            name="password"
            type="password"
            className="w-full p-3 bg-white text-black rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[--neon]"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}