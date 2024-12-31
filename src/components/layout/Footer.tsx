import { Link } from "components/common";

interface attribution {
  name: string;
  link: string;
}

const Footer = () => {
  const attributions = [
    { name: "OpenStreetMap", link: "https://www.openstreetmap.org/copyright" },
    {
      name: "CARTO",
      link: "https://www.carto.com/attributions",
    },
  ];

  return (
    <div className="w-full text-white p-4 bg-zinc-800 flex flex-col">
      <div>
        Check out the source code on{" "}
        <a
          className="underline text-cyan-400"
          href="https://github.com/stuott/my-portfolio"
        >
          GitHub
        </a>
      </div>
      <div className="flex gap-x-2 flex-wrap">
        Map data provided by{" "}
        {attributions.map(({ name, link }: attribution) => (
          <Link to={link} hideIcon>
            &copy; {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
