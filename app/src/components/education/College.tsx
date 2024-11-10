import Badges from "components/common/Badges";
import Section from "components/common/Section";

const College = () => {
  return (
    <Section
      id="education"
      title="Education"
      className="bg-zinc-900/30 px-6 md:px-12 lg:px-24"
    >
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
          <Badges
            className="pt-2"
            captions={["3.93 GPA", "Summa Cum Laude", "Dean's List"]}
          />
        </div>
      </div>
    </Section>
  );
};

export default College;
