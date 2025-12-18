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

  // Update marker when lat/lng valid
  const tryUpdateMarker = (lat, lng) => {
    if (lat !== "" && lng !== "" && !isNaN(lat) && !isNaN(lng)) {
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
      setTimeout(() => setPopup(false), 2500);

      setForm({
        title: "",
        description: "",
        category: "road",
        lat: "",
        lng: "",
        image: null,
      });
      setPreviewImg(null);
      setTempMarker(null);

      loadIssues();
    } catch (err) {
      alert("Submit failed");
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-6 pt-20
                    grid md:grid-cols-2 gap-8
                    h-[calc(100vh-5rem)]">

      {/* Success Popup */}
      {popup && (
        <div className="fixed top-20 right-6 z-[9999]
                bg-emerald-600 text-white px-6 py-3
                rounded-lg shadow-xl">
          ✅ Issue submitted successfully
        </div>
      )}

      {/* FORM PANEL */}
      <div className="glass p-6 rounded-xl shadow-xl space-y-5 overflow-y-auto h-full">
        <h1 className="text-3xl font-bold text-white">Report an Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Issue Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
            required
          />

          <textarea
            placeholder="Describe the issue"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
            required
          />

          <div className="text-[--neon] font-semibold">
            Suggested category: {autoDetect().toUpperCase()}
          </div>

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

          <button
            type="button"
            onClick={useGPS}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            📍 Use GPS Location
          </button>

          <div className="space-y-3">
            <label
              htmlFor="imageUpload"
              className="w-full flex justify-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg cursor-pointer"
            >
              📷 Choose Image
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setForm({ ...form, image: file });
                setPreviewImg(URL.createObjectURL(file));
              }}
              className="hidden"
            />

            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border border-white/20"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[--neon2] hover:bg-[--neon] text-white rounded-xl shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>

      {/* MAP PANEL */}
      <div className="h-full rounded-xl overflow-hidden border border-white/20">
        <MapComponent
          key={tempMarker ? `${tempMarker.lat}-${tempMarker.lng}` : "static"}
          issues={issues}
          tempMarker={tempMarker}
        />
      </div>

    </section>
  );
}