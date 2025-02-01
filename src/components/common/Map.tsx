import { Section } from "@components/layout";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface marker {
  coordinates: number[];
  name: string;
  description: string;
}

interface MapProps {
  position: number[];
  centerMarker?: boolean;
  markers?: marker[];
  zoom?: number;
  zoomControl?: boolean;
  stationary?: boolean;
}

const Map = ({
  position,
  markers,
  centerMarker,
  stationary,
  zoomControl,
  zoom = 4,
}: MapProps) => {
  const center: LatLngTuple = position as LatLngTuple;
  const tileURL =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <Section id="map" className="bg-zinc-900">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={zoomControl}
        className="h-120 border"
        zoomControl={zoomControl}
        attributionControl={false}
        dragging={!stationary}
      >
        <TileLayer url={tileURL} />
        {centerMarker && (
          <Marker position={center}>
            <Popup>{centerMarker}</Popup>
          </Marker>
        )}
        {markers &&
          markers?.map((marker, index) => (
            <Marker key={index} position={marker.coordinates as LatLngTuple}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </Section>
  );
};

export default Map;
