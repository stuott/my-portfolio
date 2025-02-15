const Rating = ({ rating }: { rating: number | undefined }) => {
  if (!rating) {
    return <p className="text-gray-400 italic">no rating found</p>;
  }

  const roundedRating = Math.floor(rating);
  const baseURL = "/graphics/rating/" + roundedRating;
  const ratingURL = Number.isInteger(rating)
    ? baseURL + ".svg"
    : baseURL + "_5.svg";

  return <img className="w-24" src={ratingURL} alt="book rating" />;
};

export default Rating;
