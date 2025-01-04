import { LinkInfo } from "types";
import Link from "./Link";

interface LinkTableProps {
  links: LinkInfo[];
  disabled?: boolean;
}

/**
 * Icon link table component.
 * @param links - Array of icon links to display.
 */
const LinkTable = ({ links, disabled }: LinkTableProps) => {
  return (
    <div className="flex text-white text-xl gap-3">
      {links.map((link) => (
        <Link {...link} disabled={disabled} />
      ))}
    </div>
  );
};

export default LinkTable;
