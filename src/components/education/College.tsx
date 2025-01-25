import { Link } from "@components/common";
import Section from "@components/layout/Section";
import classNames from "classnames";

const College = () => {
  const divClasses = classNames(
    "flex flex-col",
    "gap-16 w-full h-150",
    "items-center text-center justify-center"
  );

  return (
    <Section id="education">
      <div className={divClasses}>
        <div className="space-y-4">
          <Link
            className="transition max-w-sm"
            to="https://www.mtu.edu/"
            hideIcon
          >
            <img
              className="p-4 transition bg-rose-900 hover:bg-rose-800"
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
        <div className="space-y-4">
          <Link
            className="transition max-w-sm"
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
              National Alum | Previous President
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default College;
