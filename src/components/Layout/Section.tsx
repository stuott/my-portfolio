import React from "react";

interface sectionProps {
  id?: string;
  title?: string;
  className?: string;
}

const Section = (props: React.PropsWithChildren<sectionProps>) => {
  const { id, title, children, className } = props;

  return (
    <section
      id={id}
      className={
        "flex flex-col py-6 gap-4 text-white px-6 md:px-12 lg:px-24 " +
        className
      }
    >
      {title ? (
        <h2 className="text-zinc-300 text-xl font-bold">{title}</h2>
      ) : (
        <></>
      )}
      {children}
    </section>
  );
};

export default Section;
