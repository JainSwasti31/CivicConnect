import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user)
    return <p className="text-center mt-20">Please log in.</p>;

  return (
    <section className="max-w-md mx-auto p-8 glass mt-10 rounded-xl">
      <h2 className="text-2xl text-[--neon] mb-4">Your Profile</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
    </section>
  );
}
