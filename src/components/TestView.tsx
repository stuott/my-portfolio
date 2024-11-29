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
  Timeline,
} from "components/common";
import { TimelineItem } from "components/common/Timeline";
import { Section } from "components/layout";

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

  return (
    <div className="bg-zinc-900/50 p-6">
      <Section title="Badges">
        <Badges captions={badges} />
      </Section>
      <Section title="Bullet List">
        <BulletList points={points} />
      </Section>
      <Section title="Icon Button">
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
    </div>
  );
};

export default TestView;
