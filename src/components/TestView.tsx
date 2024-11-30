import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faHatWizard,
  faProjectDiagram,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import {
  Badges,
  BulletList,
  Button,
  ButtonTable,
  Link,
  LinkTable,
  SearchBar,
  Timeline,
} from "components/common";
import { TimelineItem } from "components/common/Timeline";
import { Section } from "components/layout";
import { useState } from "react";

const TestView = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [option, setOption] = useState<string>("");

  const badges = ["Badge 1", "Badge 2", "Badge 3"];

  const points = ["Point 1", "Point 2", "Point 3"];

  const timelineItems: TimelineItem[] = [
    {
      time: "time 1",
      title: "event 1",
      badges: ["badge", "badge"],
      points: [
        "a short point",
        "a medium length point with more explanation",
        "really long point that should wrap around at least one line in the timeline if not two",
      ],
    },
    {
      time: "time 2",
      title: "event 2",
      badges: ["badge", "badge"],
      points: [
        "a short point",
        "a medium length point with more explanation",
        "really long point that should wrap around at least one line in the timeline if not two",
      ],
    },
    {
      time: "time 3",
      title: "event w/ link",
      link: {
        to: "/projects",
        internal: true,
      },
      badges: ["badge", "badge"],
      points: [
        "a short point",
        "a medium length point with more explanation",
        "really long point that should wrap around at least one line in the timeline if not two",
      ],
    },
  ];

  const dropdown = {
    options: ["option 1", "option 2", "option 3"],
    placeholder: "dropdown",
    setSelection: setOption,
  };

  const filters = {
    filters: ["filter 1", "filter 2", "filter 3"],
    onFilter: setFilter,
  };

  const onButtonClick = () => {
    alert("button clicked");
  };

  const hoverColors = {
    bg: "cyan-800",
    hoverBg: "cyan-600",
  };

  const links = [
    { icon: faHatWizard, to: "#", hoverColor: "cyan-600" },
    { icon: faWandMagicSparkles, to: "#", hoverColor: "cyan-600" },
    { icon: faHatWizard, to: "#", hoverColor: "cyan-600" },
    { icon: faWandMagicSparkles, to: "#", hoverColor: "cyan-600" },
    { icon: faHatWizard, to: "#", hoverColor: "cyan-600" },
    { icon: faWandMagicSparkles, to: "#", hoverColor: "cyan-600" },
  ];

  const buttons = [
    { icon: faWandMagicSparkles, onClick: onButtonClick, ...hoverColors },
    { icon: faWandMagicSparkles, onClick: onButtonClick, ...hoverColors },
    { icon: faWandMagicSparkles, onClick: onButtonClick, ...hoverColors },
    { icon: faWandMagicSparkles, onClick: onButtonClick, ...hoverColors },
  ];

  return (
    <div className="bg-zinc-900/50 p-6">
      <Section title="Badges">
        <Badges captions={badges} />
      </Section>
      <Section title="Bullet List">
        <BulletList points={points} />
      </Section>
      <Section title="Icon-only Buttons">
        <Button icon={faWandMagicSparkles} onClick={onButtonClick} />
        <Button
          icon={faWandMagicSparkles}
          {...hoverColors}
          onClick={onButtonClick}
        />
        <Button
          icon={faWandMagicSparkles}
          {...hoverColors}
          onClick={onButtonClick}
          scale
        />
        <Button
          icon={faWandMagicSparkles}
          {...hoverColors}
          onClick={onButtonClick}
          disabled
        />
      </Section>
      <Section title="Text-Only Buttons">
        <Button onClick={onButtonClick}>simple</Button>
        <Button icon={faWandMagicSparkles} onClick={onButtonClick}>
          icon
        </Button>
        <Button icon={faWandMagicSparkles} onClick={onButtonClick} flipped>
          flipped
        </Button>
        <Button
          onClick={onButtonClick}
          icon={faWandMagicSparkles}
          {...hoverColors}
        >
          background w/ hover
        </Button>
        <Button
          onClick={onButtonClick}
          icon={faWandMagicSparkles}
          {...hoverColors}
          scale
        >
          scaling w/ hover
        </Button>
        <Button
          onClick={onButtonClick}
          icon={faWandMagicSparkles}
          {...hoverColors}
          disabled
        >
          disabled
        </Button>
      </Section>
      <Section title="Link Table">
        <LinkTable links={links} />
      </Section>
      <Section title="Button Table">
        <ButtonTable buttons={buttons} />
      </Section>
      <Section title="Links">
        <Link to="https://www.google.com" hoverColor="cyan-600">
          external link (www.google.com)
        </Link>
        <Link to="/projects" internal hoverColor="cyan-600">
          internal link (/projects)
        </Link>
        <Link to="" disabled>
          disabled link (external)
        </Link>
        <Link to="" internal disabled>
          disabled link (internal)
        </Link>
      </Section>
      <Section title="Icon Links">
        <Link
          to="https://www.google.com"
          icon={faGoogle}
          hoverColor="cyan-600"
        />
        <Link
          to="/projects"
          icon={faProjectDiagram}
          internal
          hoverColor="cyan-600"
        />
        <Link to="https://www.google.com" icon={faGoogle} disabled />
        <Link to="/projects" icon={faProjectDiagram} internal disabled />
      </Section>
      <Section title="Timeline">
        <Timeline items={timelineItems} />
      </Section>
      <Section title="Flipped Timeline">
        <Timeline items={timelineItems} flipped />
      </Section>
      <Section title="Basic Searchbar">
        <SearchBar
          placeholder="searchbar"
          onSearch={() => {}}
          setSearch={() => {}}
        />
      </Section>
      <Section title="Searchbar w/ Dropdown">
        <SearchBar
          placeholder="searchbar"
          onSearch={() => {}}
          setSearch={() => {}}
          dropdown={dropdown}
        />
      </Section>
      <Section title="Searchbar w/ Filters">
        <SearchBar
          placeholder="searchbar"
          onSearch={() => {}}
          setSearch={() => {}}
          filters={filters}
        />
      </Section>
      <Section title="Searchbar w/ Filters & Dropdown">
        <SearchBar
          placeholder="searchbar"
          setSearch={(term) => {
            setSearchTerm(term);
            setSearching(false);
          }}
          onSearch={() => setSearching(true)}
          filters={filters}
          dropdown={dropdown}
        />
        {searching && searchTerm && <p>Searching for: {searchTerm}</p>}
        {searching && filter && <p>Selected filter: {filter}</p>}
        {searching && option && <p>Selected option: {option}</p>}
      </Section>
      <Section title="Disabled Searchbar">
        <SearchBar
          disabled
          placeholder="searchbar"
          onSearch={() => {}}
          setSearch={() => {}}
          filters={filters}
          dropdown={dropdown}
        />
      </Section>
    </div>
  );
};

export default TestView;
