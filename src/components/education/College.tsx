import { Link } from "@components/common";
import Section from "@components/layout/Section";
import classNames from "classnames";

const College = () => {
  const divClasses = classNames(
    "flex flex-col",
    "gap-10 w-full h-200",
    "items-center text-center justify-center"
  );

  return (
    <Section id="education">
      <div className={divClasses}>
        <MTUCallout />
        <TriangleCallout />
        <EnterpriseCallout />
      </div>
    </Section>
  );
};

const MTUCallout = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Link className="transition max-w-xs" to="https://www.mtu.edu/" hideIcon>
        <img
          className="p-4 transition bg-rose-900 hover:bg-rose-800"
          alt="Michigan Techological University Logo"
          src={"/images/MTU_Logo.png"}
        />
      </Link>
      <div>
        <p className="text-zinc-200 font-bold">MTU - BS Computer Engineering</p>
        <p className="text-zinc-200 italic">
          3.93 GPA | Summa Cum Laude | Dean's List
        </p>
      </div>
    </div>
  );
};

const TriangleCallout = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Link
        className="transition max-w-xs"
        to="https://www.triangle.org/"
        hideIcon
      >
        <img
          className="p-4 transition bg-rose-900 hover:bg-rose-800"
          alt="Triangle Fraternity National Logo"
          src={"/graphics/triangle_logo.svg"}
        />
      </Link>
      <div>
        <p className="text-zinc-200 font-bold">
          Triangle Fraternity at Michigan Tech
        </p>
        <p className="text-zinc-200 italic">
          Alum | Previous Chapter President & Vice President Internal
        </p>
      </div>
    </div>
  );
};

const EnterpriseCallout = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Link
        className="transition max-w-xs"
        to="https://blogs.mtu.edu/enterprise/2022/06/1258/"
        hideIcon
      >
        <img
          className="p-4 transition bg-rose-900 hover:bg-rose-800"
          alt="Blue Marble Security Logo"
          src={"/graphics/blue_marble_logo.svg"}
        />
      </Link>
      <div>
        <p className="text-zinc-200 font-bold">
          Blue Marble Security Enterprise
        </p>
        <p className="text-zinc-200 italic">
          General Motors Cost Effective Pick-Point System Project
        </p>
      </div>
    </div>
  );
};

export default College;
