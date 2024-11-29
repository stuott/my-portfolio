import {
  faHatWizard,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import {
  Badges,
  BulletList,
  IconButton,
  IconTable,
  Link,
  SearchBar,
  Timeline,
} from "components/common";
import { TimelineItem } from "components/common/Timeline";
import { Section } from "components/layout";
import { useState } from "react";

const TestView = () => {
  const badges = ["Badge 1", "Badge 2", "Badge 3"];
  const points = ["Point 1", "Point 2", "Point 3"];
  const iconLinks = [
    { icon: faHatWizard, url: "#" },
    { icon: faWandMagicSparkles, url: "#" },
    { icon: faHatWizard, url: "#" },
    { icon: faWandMagicSparkles, url: "#" },
    { icon: faHatWizard, url: "#" },
    { icon: faWandMagicSparkles, url: "#" },
  ];
  const timelineItems: TimelineItem[] = [
    {
      time: "Time 1",
      title: "Event 1",
      badges: ["Badge", "Badge"],
      points: ["Point", "Point", "Point"],
    },
    {
      time: "Time 2",
      title: "Event 2",
      badges: ["Badge", "Badge"],
      points: ["Point", "Point", "Point"],
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [option, setOption] = useState<string>("");

  return (
    <div className="bg-zinc-900/50 p-6">
      <Section title="Badges">
        <Badges captions={badges} />
      </Section>
      <Section title="Bullet List">
        <BulletList points={points} />
      </Section>
      <Section title="Icon Button">
        <div className="space-x-4">
          <IconButton
            icon={faWandMagicSparkles}
            text="Simple Button"
            onClick={() => alert("Button clicked!")}
          />
          <IconButton
            icon={faWandMagicSparkles}
            text="Flipped Button"
            onClick={() => alert("Button clicked!")}
            flipped
          />
          <IconButton
            icon={faWandMagicSparkles}
            bgColor="cyan-900"
            hoverBgColor="cyan-700"
            text="Button w/ Background"
            onClick={() => alert("Button clicked!")}
          />
          <IconButton
            icon={faWandMagicSparkles}
            bgColor="cyan-900"
            hoverBgColor="cyan-700"
            text="Scaling Button"
            onClick={() => alert("Button clicked!")}
            scale
          />
        </div>
      </Section>
      <Section title="Icon Table">
        <IconTable links={iconLinks} />
      </Section>
      <Section title="Links">
        <Link
          text="External Link (www.google.com)"
          to="https://www.google.com"
        />
        <Link text="Internal Link (/projects)" to="/projects" internal />
        <Link text="Blank Link (External)" to="" />
        <Link text="Blank Link (Internal)" to="" internal />
      </Section>
      <Section title="Timeline">
        <Timeline items={timelineItems} />
      </Section>
      <Section title="Flipped Timeline">
        <Timeline items={timelineItems} flipped />
      </Section>
      <Section title="Basic Searchbar">
        <SearchBar placeholder="searchbar" setSearch={() => {}} />
      </Section>
      <Section title="Searchbar w/ Dropdown">
        <SearchBar
          placeholder="searchbar"
          setSearch={() => {}}
          dropdown={{
            options: ["option 1", "option 2", "option 3"],
            placeholder: "dropdown",
          }}
        />
      </Section>
      <Section title="Searchbar w/ Filters">
        <SearchBar
          placeholder="searchbar"
          setSearch={() => {}}
          filters={{ filters: ["filter 1", "filter 2", "filter 3"] }}
        />
      </Section>
      <Section title="Functional Searchbar">
        <SearchBar
          className="py-10"
          placeholder="searchbar"
          setSearch={(term) => {
            setSearchTerm(term);
            setSearching(false);
          }}
          onSearch={() => setSearching(true)}
          filters={{
            filters: ["filter 1", "filter 2", "filter 3"],
            onFilter: setFilter,
          }}
          dropdown={{
            options: ["option 1", "option 2", "option 3"],
            placeholder: "dropdown",
            setSelection: setOption,
          }}
        />
        {searching && searchTerm && <p>Searching for: {searchTerm}</p>}
        {searching && filter && <p>Selected filter: {filter}</p>}
        {searching && option && <p>Selected option: {option}</p>}
      </Section>
    </div>
  );
};

export default TestView;
