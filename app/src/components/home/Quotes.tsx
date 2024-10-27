import Section from "components/common/Section";
import quotesData from "data/quotes.json";

export default function Quotes() {
  const data = quotesData.data;
  const date = new Date(Date.now());
  const quote = data[date.getDay() % data.length];

  return (
    <Section id="meditation" className="px-6 md:px-12 lg:px-24 bg-zinc-900/30">
      <div
        className="text-center text-lg text-zinc-400 text-balance"
        style={{ textShadow: "1px 1px 5px rgba(0, 0, 0, 1)" }}
      >
        <blockquote>"{quote.text}"</blockquote>
        <p className="text-sm"> - {quote.author}</p>
      </div>
    </Section>
  );
}
