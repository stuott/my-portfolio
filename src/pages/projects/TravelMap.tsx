import { SearchBar } from "@components/common";
import Map, { marker } from "@components/common/Map";
import { Section } from "@components/layout";
import data from "@data/locations.json";
import { useEffect, useState } from "react";

type LocationType = "work" | "personal" | "family";

interface Location {
  name: string;
  coordinates: [number, number];
  description: string;
  types: LocationType[];
}

const locationToMarker = (location: Location) => ({
  coordinates: location.coordinates,
  name: location.name,
  description: location.description,
  badges: location.types,
});

const TravelMap = () => {
  const locations: Location[] = data.places as Location[];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<LocationType | "">();
  const [markers, setMarkers] = useState<marker[]>([]);

  const locationMatch = (location: Location) => {
    const locationMatchesSearch =
      location.name.toLowerCase().includes(search.toLowerCase()) ||
      location.description.toLowerCase().includes(search.toLowerCase());

    const locationMatchesFilter =
      !filter || location.types.includes(filter.toLowerCase() as LocationType);

    return locationMatchesSearch && locationMatchesFilter;
  };

  useEffect(() => {
    setMarkers(locations.filter(locationMatch).map(locationToMarker));
  }, [locations, search, filter]);

  return (
    <div className="min-h-screen bg-zinc-900/50">
      <Section>
        <SearchBar<LocationType>
          setSearch={setSearch}
          onSearch={() => {}}
          placeholder="search locations"
          filters={{
            filters: ["work", "personal", "family"],
            onFilter: (filter) => {
              setFilter(filter);
            },
          }}
        />
        <Map
          position={[39.8097343, -98.5556199]}
          markers={markers}
          zoom={3}
          zoomControl
        />
      </Section>
    </div>
  );
};

export default TravelMap;
