import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapComponent({ issues = [], tempMarker }) {
  return (
    <MapContainer
      center={[28.6, 77.2]}
      zoom={11}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-xl z-10"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Saved Issues */}
      {issues.map((i) => (
        <Marker key={i._id} position={[Number(i.lat), Number(i.lng)]}>
          <Popup>
            <strong>{i.title}</strong>
            <br />
            {i.description}
          </Popup>
        </Marker>
      ))}

      {/* LIVE PREVIEW MARKER */}
      {tempMarker?.lat && tempMarker?.lng && (
        <Marker
          position={[
            Number(tempMarker.lat),
            Number(tempMarker.lng),
          ]}
        >
          <Popup>Selected location preview</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}