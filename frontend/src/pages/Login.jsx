import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(e.target.email.value, e.target.password.value);
    nav(user.role === "municipal" ? "/admin" : "/report");
  };

  return (
    <section className="max-w-md mx-auto p-8 glass mt-10 rounded-xl">
      <h2 className="text-2xl text-[--neon] mb-4">Login</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="email"
          className="w-full p-3 bg-white/10 rounded"
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          className="w-full p-3 bg-white/10 rounded"
          placeholder="Password"
          required
        />
        <button className="w-full bg-[--neon] text-[#0b0c2a] py-3 rounded-lg font-semibold">
          Login
        </button>
      </form>
    </section>
  );
}
