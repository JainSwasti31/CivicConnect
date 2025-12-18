import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 pt-16">

      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[--neon] opacity-20 blur-[120px]" />
      <div className="absolute top-20 -right-40 w-96 h-96 bg-purple-500 opacity-20 blur-[120px]" />

      <div className="relative text-center glass rounded-2xl border border-white/10 shadow-2xl 
                      px-8 py-16 max-w-4xl w-full">

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-[--neon]">Empowering Citizens.</span>
          <br />
          <span className="text-white">Enhancing Cities.</span>
        </h1>

        <p className="mt-5 text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          Report civic issues, track resolutions in real time, and help build
          cleaner, safer, and smarter cities together.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <Link
            to="/report"
            className="px-7 py-3 bg-red-600 text-white rounded-full
             font-semibold shadow-xl
             hover:bg-red-700 hover:scale-105
             transition relative z-10"
          >
            🚨 Report Issue
          </Link>

          <Link
            to="/map"
            className="px-7 py-3 bg-blue-600 text-white rounded-full
                       font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition"
          >
            🗺 View Map
          </Link>

          <Link
            to="/register"
            className="px-7 py-3 bg-white/10 backdrop-blur
                       text-white rounded-full border border-white/20
                       hover:bg-white/20 hover:scale-105 transition"
          >
            ✍ Register
          </Link>
        </div>

        {/* Feature line */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
          <span>✔ Real-time Tracking</span>
          <span>✔ GPS-based Reports</span>
          <span>✔ Municipality Verified</span>
        </div>

      </div>
    </section>
  );
}