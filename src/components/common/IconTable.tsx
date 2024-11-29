import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLink } from "types";

export default function IconTable(props: { links: IconLink[] }) {
  const { links } = props;

  return (
    <div className="flex text-white text-xl gap-3">
      {links.map((link) => {
        return (
          <a href={link.url} aria-label="link">
            <FontAwesomeIcon icon={link.icon} />
          </a>
        );
      })}
    </div>
  );
}
