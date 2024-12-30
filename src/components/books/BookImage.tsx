import classNames from "classnames";

interface BookImageProps {
  isbn13: string;
  alt: string;
  size: "S" | "M" | "L" | "XL";
  quality?: "S" | "M" | "L";
}

const BookImage = ({ isbn13, alt, size, quality }: BookImageProps) => {
  const imgClasses = classNames({
    "w-24 h-32": size === "S",
    "w-36 h-48": size === "M",
    "w-48 h-64": size === "L",
    "w-72 h-96": size === "XL",
  });

  if (!isbn13) {
    return <div className={imgClasses + " bg-zinc-900 text-white"}>{alt}</div>;
  }

  const link = `https://covers.openlibrary.org/b/isbn/${isbn13}-${
    quality ?? "M"
  }.jpg`;

  return <img src={link} alt={alt} className={imgClasses} />;
};

export default BookImage;
