import classNames from "classnames";

interface BookImageProps {
  isbn13: string;
  alt: string;
  size: "XS" | "S" | "M" | "L" | "XL";
  quality?: "S" | "M" | "L";
}

const BookImage = ({ isbn13, alt, size, quality }: BookImageProps) => {
  const imgClasses = classNames({
    "w-20 h-30": size === "XS",
    "w-30 h-45": size === "S",
    "w-40 h-60": size === "M",
    "w-50 h-75": size === "L",
    "w-60 h-90": size === "XL",
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
