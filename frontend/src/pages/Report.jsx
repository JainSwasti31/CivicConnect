import { useState, useEffect } from "react";
import api from "../api";
import MapComponent from "../components/MapComponent";

export default function Report() {
  const [issues, setIssues] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "road",
    lat: "",
    lng: "",
    image: null,
  });

  const [tempMarker, setTempMarker] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [popup, setPopup] = useState(false);

  // Load existing issues
  const loadIssues = async () => {
    try {
      const res = await api.get("/issues");
      setIssues(res.data.issues || []);
    } catch (err) {
      console.log("Error loading issues:", err);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // Auto category detection
  const autoDetect = () => {
    const text = (form.title + " " + form.description).toLowerCase();

    if (text.includes("pothole") || text.includes("road")) return "road";
    if (text.includes("trash") || text.includes("garbage")) return "garbage";
    if (text.includes("water") || text.includes("pipe")) return "water";
    if (text.includes("light") || text.includes("electric")) return "electricity";

    return "road";
  };

  // GPS Button
  const useGPS = () => {
    navigator.geolocation.getCurrentPosition((loc) => {
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;

      setForm({ ...form, lat, lng });
      setTempMarker({ lat, lng });
    });
  };

  // Only update marker when BOTH lat and lng are valid numbers
  const tryUpdateMarker = (lat, lng) => {
    if (
      lat !== "" &&
      lng !== "" &&
      !isNaN(lat) &&
      !isNaN(lng)
    ) {
      setTempMarker({ lat: Number(lat), lng: Number(lng) });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      const finalForm = { ...form, category: autoDetect() };

      Object.entries(finalForm).forEach(([key, val]) => {
        if (val !== null && val !== "") fd.append(key, val);
      });

      await api.post("/issues", fd);

      setPopup(true);
      setTimeout(() => setPopup(false), 2000);

      loadIssues();
    } catch (err) {
      alert("Submit failed");
      console.log(err);
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* Success popup */}
      {popup && (
        <div className="fixed top-5 right-5 bg-[--neon] text-white px-6 py-3 rounded-xl shadow-xl animate-bounce">
          Issue submitted ✔
        </div>
      )}

      {/* FORM PANEL */}
      <div className="glass p-8 rounded-xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-white">Report an Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 1. Title */}
          <input
            type="text"
            placeholder="Issue Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-[--neon]"
          />

          {/* 2. Description */}
          <textarea
            placeholder="Describe the issue"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-[--neon]"
          />

          {/* AI category */}
          <div className="text-[--neon] font-semibold">
            Suggested category: {autoDetect().toUpperCase()}
          </div>

          {/* 3. Coordinates */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Latitude"
              value={form.lat}
              onChange={(e) => {
                const lat = e.target.value;
                setForm({ ...form, lat });
                tryUpdateMarker(lat, form.lng);
              }}
              className="flex-1 p-3 rounded-lg bg-white/10 text-white border border-white/20"
            />

            <input
              type="text"
              placeholder="Longitude"
              value={form.lng}
              onChange={(e) => {
                const lng = e.target.value;
                setForm({ ...form, lng });
                tryUpdateMarker(form.lat, lng);
              }}
              className="flex-1 p-3 rounded-lg bg-white/10 text-white border border-white/20"
            />
          </div>

          {/* Use GPS */}
          <button
            type="button"
            onClick={useGPS}
            className="py-2 px-4 bg-[--neon] rounded-lg text-white shadow hover:bg-[--neon2]"
          >
            Use GPS
          </button>

          {/* 4. Image Upload */}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm({ ...form, image: file });
              setPreviewImg(URL.createObjectURL(file));
            }}
            className="w-full p-2 rounded-lg bg-white/10 text-white border border-white/20 file:bg-[--neon2] file:text-white file:rounded-lg"
          />

          {previewImg && (
            <img
              src={previewImg}
              className="w-full h-40 object-cover rounded-lg border border-white/20"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[--neon2] hover:bg-[--neon] text-white rounded-xl shadow-lg hover:scale-105"
          >
            Submit
          </button>

        </form>
      </div>

      {/* MAP PANEL */}
      <div>
        <MapComponent 
          key={tempMarker ? `${tempMarker.lat}-${tempMarker.lng}` : "static"} 
          issues={issues} 
          tempMarker={tempMarker} 
        />
      </div>

    </section>
  );
}