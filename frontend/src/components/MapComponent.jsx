import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* 🔹 AUTO-FOCUS MAP ON MARKERS */
function FocusOnIssues({ issues, tempMarker }) {
  const map = useMap();

  useEffect(() => {
    // Priority: temp marker (while reporting)
    if (tempMarker?.lat && tempMarker?.lng) {
      map.setView(
        [Number(tempMarker.lat), Number(tempMarker.lng)],
        15,
        { animate: true }
      );
      return;
    }

    // Valid issue locations
    const validIssues = issues.filter(
      i => i.location?.lat && i.location?.lng
    );

    // Single issue → center directly
    if (validIssues.length === 1) {
      map.setView(
        [
          Number(validIssues[0].location.lat),
          Number(validIssues[0].location.lng),
        ],
        15,
        { animate: true }
      );
    }

    // Multiple issues → fit bounds
    if (validIssues.length > 1) {
      const bounds = validIssues.map(i => [
        Number(i.location.lat),
        Number(i.location.lng),
      ]);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [issues, tempMarker, map]);

  return null;
}

export default function MapComponent({ issues = [], tempMarker }) {
  // Default center (fallback)
  const defaultCenter = [28.6, 77.2];

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={true}
        className="h-full w-full rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🔹 AUTO FOCUS */}
        <FocusOnIssues issues={issues} tempMarker={tempMarker} />

        {/* ISSUE MARKERS */}
        {issues.map(issue =>
          issue.location?.lat && issue.location?.lng ? (
            <Marker
              key={issue._id}
              position={[
                Number(issue.location.lat),
                Number(issue.location.lng),
              ]}
            >
              <Popup>
                <strong>{issue.title}</strong>
                <br />
                {issue.description}
              </Popup>
            </Marker>
          ) : null
        )}

        {/* TEMP MARKER (while reporting) */}
        {tempMarker?.lat &&
          tempMarker?.lng &&
          !isNaN(tempMarker.lat) &&
          !isNaN(tempMarker.lng) && (
            <Marker
              position={[
                Number(tempMarker.lat),
                Number(tempMarker.lng),
              ]}
            >
              <Popup>Selected Location</Popup>
            </Marker>
          )}
      </MapContainer>
    </div>
  );
}