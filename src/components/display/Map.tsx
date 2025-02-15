import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Badges from "./Badges";

export interface marker {
  coordinates: number[];
  name: string;
  description: string;
  badges?: string[];
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
            <Popup>
              <div className="font-mono flex flex-col gap-2">
                <span className="font-bold">{marker.name}</span>
                <Badges className="text-white" captions={marker.badges ?? []} />
                <span>{marker.description}</span>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
