import hash from "object-hash";
import Link, { LinkProps } from "../controls/Link";

interface LinkTableProps {
  links: LinkProps[];
  disabled?: boolean;
}

/**
 * Icon link table component.
 * @param links - Array of icon links to display.
 */
const LinkTable = ({ links, disabled }: LinkTableProps) => {
  return (
    <div className="flex text-white text-xl gap-3">
      {links.map((link, index) => {
        const linkKey = "link_" + hash(link) + index;
        return <Link key={linkKey} {...link} disabled={disabled} />;
      })}
    </div>
  );
};

export default LinkTable;
