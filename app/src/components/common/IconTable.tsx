import { Icon } from "types";

export default function IconTable(props: { icons: Icon[] }) {
  const { icons } = props;

  return (
    <div className="flex text-white text-xl gap-3">
      {icons.map((icon) => {
        return (
          <a href={icon.url} aria-label="link">
            {icon.element}
          </a>
        );
      })}
    </div>
  );
}
