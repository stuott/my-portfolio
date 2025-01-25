import { faAnglesDown, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

interface sectionProps {
  id?: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  noPad?: boolean;
  collapsable?: boolean;
  startCollapsed?: boolean;
}

const Section = ({
  id,
  title,
  children,
  className,
  noPad,
  collapsable,
  startCollapsed,
}: sectionProps) => {
  const [collapsed, setCollapsed] = React.useState(startCollapsed);

  const setionClasses = classNames(
    "flex flex-col gap-4 text-white  max-w-screen-lg mx-auto",
    className,
    { "py-6 px-6 md:px-12 lg:px-24": !noPad }
  );

  const titleWithCollapse = collapsable ? (
    <button
      className="flex items-center gap-2"
      onClick={() => {
        setCollapsed(!collapsed);
      }}
    >
      <h2 className="text-zinc-300 text-xl font-bold">{title}</h2>
      <span className="text-zinc-300">
        {collapsed ? (
          <FontAwesomeIcon icon={faAnglesRight} />
        ) : (
          <FontAwesomeIcon icon={faAnglesDown} />
        )}
      </span>
    </button>
  ) : (
    title
  );

  return (
    <section id={id} className={setionClasses}>
      {title && (
        <h2 className="text-zinc-300 text-xl font-bold">{titleWithCollapse}</h2>
      )}
      <Content collapsed={collapsed}>{children}</Content>
    </section>
  );
};

interface ContentProps {
  children: React.ReactNode;
  collapsed?: boolean;
}

const Content = ({ children, collapsed }: ContentProps) => {
  const collapseClass = classNames(
    "overflow-hidden transition-all duration-300",
    {
      "h-0": collapsed,
      "h-full": !collapsed,
    }
  );

  return <div className={collapseClass}>{children}</div>;
};

export default Section;
