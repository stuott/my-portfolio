import Badges from "components/common/Badges";
import Section from "components/common/Section";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="flex flex-col md:flex-row w-full gap-6">
        <a
          className="transition max-w-xs hover:scale-[1.02] p-4 bg-cyan-900 hover:bg-cyan-700"
          href="https://www.mtu.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Michigan Techological University Logo"
            src={process.env.PUBLIC_URL + "/MTU_Logo.png"}
          />
        </a>
        <div className="md:max-w-xs">
          <p className="text-zinc-200 font-bold">BS Computer Engineering</p>
          <p className="text-zinc-400 italic">3.93 GPA | Dean's List</p>
          <Badges
            captions={[
              "Triangle Fraternity - President",
              "Blue Marble Security Enterprise",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}
