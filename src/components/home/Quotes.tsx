import Section from "components/layout/Section";
import quotesData from "data/quotes.json";

export default function Quotes() {
  const data = quotesData.data;
  const date = new Date(Date.now());
  const quote = data[date.getDay() % data.length];

  return (
    <Section id="meditation">
      <div
        className="text-center text-lg text-zinc-400 text-balance"
        style={{ textShadow: "1px 1px 10px black" }}
      >
        <blockquote>"{quote.text}"</blockquote>
        <p className="text-sm"> - {quote.author}</p>
      </div>
    </Section>
  );
}
