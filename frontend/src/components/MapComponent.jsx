import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

import { useMap } from "react-leaflet";

function FlyToLocation({ tempMarker }) {
  const map = useMap();

  if (tempMarker && !isNaN(tempMarker.lat) && !isNaN(tempMarker.lng)) {
    map.flyTo([tempMarker.lat, tempMarker.lng], 14, {
      animate: true,
      duration: 1.2,
    });
  }

  return null;
}

export default function MapComponent({ issues = [], tempMarker }) {
  return (
    <MapContainer
      center={[28.6, 77.2]}
      zoom={11}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FlyToLocation tempMarker={tempMarker} />

      {issues.map((i) =>
        i.lat && i.lng ? (
          <Marker key={i._id} position={[Number(i.lat), Number(i.lng)]}>
            <Popup>
              <strong>{i.title}</strong> <br />
              {i.description}
            </Popup>
          </Marker>
        ) : null
      )}

      {tempMarker &&
        tempMarker.lat &&
        tempMarker.lng &&
        !isNaN(tempMarker.lat) &&
        !isNaN(tempMarker.lng) && (
          <Marker position={[Number(tempMarker.lat), Number(tempMarker.lng)]}>
            <Popup>Selected Location</Popup>
          </Marker>
        )}
    </MapContainer>
  );
}