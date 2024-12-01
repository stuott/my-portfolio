import classNames from "classnames";
import React from "react";

interface sectionProps {
  id?: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const Section = ({ id, title, children, className }: sectionProps) => {
  const setionClasses = classNames(
    "flex flex-col py-6 gap-4 text-white px-6 md:px-12 lg:px-24 max-w-screen-lg mx-auto",
    className
  );

  return (
    <section id={id} className={setionClasses}>
      {title && <h2 className="text-zinc-300 text-xl font-bold">{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
