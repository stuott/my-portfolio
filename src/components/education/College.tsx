import { Link } from "@components/common";
import Section from "@components/layout/Section";

const College = () => {
  return (
    <Section id="education">
      <div className="flex flex-col md:flex-row gap-4 w-full items-center md:justify-around">
        <Link
          className="transition max-w-xs"
          to="https://www.mtu.edu/"
          scale
          hideIcon
        >
          <img
            className="p-4 transition bg-cyan-900 hover:bg-cyan-800"
            alt="Michigan Techological University Logo"
            src={"/images/MTU_Logo.png"}
          />
        </Link>
        <div>
          <p className="text-zinc-200 font-bold">BS Computer Engineering</p>
          <p className="text-zinc-200 italic">
            3.93 GPA | Summa Cum Laude | Dean's List
          </p>
        </div>
      </div>
    </Section>
  );
};

export default College;
