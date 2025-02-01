import Map from "@components/common/Map";
import { Section } from "@components/layout";
import data from "@data/locations.json";

const TravelMap = () => {
  const locations = data.places;
  return (
    <div className="min-h-screen bg-zinc-900/50">
      <Section>
        <Map
          position={[39.8097343, -98.5556199]}
          markers={locations}
          zoom={3}
          zoomControl
        />
      </Section>
    </div>
  );
};

export default TravelMap;
