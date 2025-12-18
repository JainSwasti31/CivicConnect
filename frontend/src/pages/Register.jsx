import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [role, setRole] = useState("citizen");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) return alert("Please fill all fields");

    try {
      const user = await register(name, email, password, role);

      // Redirect based on role
      nav(user.role === "municipal" ? "/admin" : "/report");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <section className="max-w-md mx-auto p-8 glass mt-24 rounded-xl">
      <h2 className="text-2xl text-neon mb-4">Create Account</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full p-3 bg-white/10 rounded text-white"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 bg-white/10 rounded text-white"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 bg-white/10 rounded text-white"
        />

        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 bg-white/10 rounded text-white"
        >
          <option value="citizen" className="text-black">Citizen</option>
          <option value="municipal" className="text-black">Municipal Officer</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-neon text-midnight rounded-lg font-semibold hover:opacity-90 transition"
        >
          Register
        </button>
      </form>
    </section>
  );
}