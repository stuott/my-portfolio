import React from "react";

interface sectionProps {
  id?: string;
  title?: string;
}

export default function Section(props: React.PropsWithChildren<sectionProps>) {
  const { id, title, children } = props;

  return (
    <section id={id} className="flex flex-col pt-16 gap-4 text-white">
      {title ? (
        <h2 className="text-zinc-300 text-xl font-bold">{title}</h2>
      ) : (
        <></>
      )}
      {children}
    </section>
  );
}
