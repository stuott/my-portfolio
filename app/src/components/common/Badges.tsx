interface BadgesProps {
  captions: string[];
  className?: string;
}

const Badges = ({ captions, className }: BadgesProps) => {
  return (
    <ul className={"flex flex-wrap gap-2 " + className}>
      {captions.map((caption) => {
        return (
          <li className="rounded-xl bg-cyan-900 py-1 px-2 text-sm">
            {caption}
          </li>
        );
      })}
    </ul>
  );
};

export default Badges;
