import { useEffect, useState } from "react";
import api from "../api.js";
import MapComponent from "../components/MapComponent.jsx";

export default function MunicipalMap() {
    const [issues, setIssues] = useState([]);

    const loadIssues = async () => {
        try {
            const res = await api.get("/issues");

            // ✅ NORMALIZE ISSUE LOCATION (CRITICAL FIX)
            const normalizedIssues = (res.data.issues || []).map(issue => {
                if (issue.location?.lat && issue.location?.lng) {
                    return {
                        ...issue,
                        location: {
                            lat: Number(issue.location.lat),
                            lng: Number(issue.location.lng),
                        },
                    };
                }

                // fallback if API ever sends lat/lng directly
                if (issue.lat && issue.lng) {
                    return {
                        ...issue,
                        location: {
                            lat: Number(issue.lat),
                            lng: Number(issue.lng),
                        },
                    };
                }

                return issue;
            });

            setIssues(normalizedIssues);
        } catch (err) {
            console.log("Municipal map error:", err);
        }
    };

    useEffect(() => {
        loadIssues();
    }, []);

    return (
        <section className="max-w-7xl mx-auto p-6 pt-20 h-[calc(100vh-5rem)]">
            <h1 className="text-2xl font-bold text-white mb-4">
                📍 Live Issue Locations (Municipality)
            </h1>

            <div className="h-full rounded-xl overflow-hidden border border-white/20">
                <MapComponent issues={issues} />
            </div>
        </section>
    );
}