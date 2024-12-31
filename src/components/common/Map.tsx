import { Section } from "components/layout";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapProps {
  position: number[];
  marker?: string;
}

const Map = ({ position, marker }: MapProps) => {
  const center: LatLngTuple = position as LatLngTuple;
  const tileURL =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <Section id="map" noPad>
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        className="h-80"
        zoomControl={false}
        attributionControl={false}
        dragging={false}
      >
        <TileLayer url={tileURL} />
        {marker && (
          <Marker position={center}>
            <Popup>{marker}</Popup>
          </Marker>
        )}
      </MapContainer>
    </Section>
  );
};

export default Map;
