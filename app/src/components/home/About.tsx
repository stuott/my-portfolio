import Section from "components/common/Section";
import aboutData from "data/about.json";

export default function About() {
  const data = aboutData.data;

  return (
    <Section id="about" title="About" className="bg-zinc-900 py-6">
      <div className="grid gap-3">
        {data.map((paragraph) => {
          return <p className="">{paragraph.join(". ") + "."}</p>;
        })}
      </div>
    </Section>
  );
}
