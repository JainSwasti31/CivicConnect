import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-10">
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-[--neon] leading-tight">
          Empowering Citizens.  
          <span className="text-white"> Enhancing Cities.</span>
        </h1>

        <p className="mt-4 text-gray-300 text-lg">
          Report civic issues, track resolutions, and build a better community.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
  to="/report"
  className="px-6 py-3 bg-neon text-midnight rounded-full font-semibold shadow-lg hover:opacity-80 transition"
>
  Report Issue
</Link>

<Link
  to="/register"
  className="px-6 py-3 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition"
>
  Register
</Link>
          
          <Link
            to="/map"
            className="px-6 py-3 bg-white/10 backdrop-blur rounded-full"
          >
            View Map
          </Link>
        </div>
      </div>
    </section>
  );
}
