import classNames from "classnames";
import React from "react";

interface sectionProps {
  id?: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  noPad?: boolean;
}

const Section = ({ id, title, children, className, noPad }: sectionProps) => {
  const setionClasses = classNames(
    "flex flex-col gap-4 text-white  max-w-screen-lg mx-auto",
    className,
    { "py-6 px-6 md:px-12 lg:px-24": !noPad }
  );

  return (
    <section id={id} className={setionClasses}>
      {title && <h2 className="text-zinc-300 text-xl font-bold">{title}</h2>}
      <Content>{children}</Content>
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
