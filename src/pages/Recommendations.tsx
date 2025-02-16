import { BookImage } from "@components/books";
import { Link } from "@components/controls";
import { Section } from "@components/layout";
import AlbumCover from "@components/music/AlbumCover";
import data from "@data/recommendations.json";
import {
  faBook,
  faGlobe,
  faMusic,
  faUtensils,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { page } from "pages";

interface recommendation {
  name: string;
  url: string;
  description: string;
  mbid?: string;
  isbn?: string;
}

const Recommendations = () => {
  const { recommendations } = data;
  return (
    <Section>
      <p>last updated: 2/16/2025</p>
      <div className="space-y-4">
        <RecommendationCards
          title="Websites"
          icon={faGlobe}
          items={recommendations.websites}
        />
        <RecommendationCards
          title="Books"
          icon={faBook}
          items={recommendations.books}
        />
        <RecommendationCards
          title="Music"
          icon={faMusic}
          items={recommendations.music}
        />
        <RecommendationCards
          title="Restaurants (Madison, WI local)"
          icon={faUtensils}
          items={recommendations.food}
        />
      </div>
    </Section>
  );
};

interface recommendationCardsProps {
  title: string;
  icon?: IconDefinition;
  items: recommendation[];
}

const RecommendationCards = ({
  title,
  icon,
  items,
}: recommendationCardsProps) => {
  return (
    <div className="bg-zinc-800 space-y-4 text-white p-4">
      <p className="text-lg font-bold bg-red-900/40 px-4 py-2">
        {icon && <FontAwesomeIcon icon={icon} />} {title}
      </p>
      <div className="space-y-4">
        {items.map((item: recommendation, index: number) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-2 bg-zinc-900/40 p-4"
          >
            {item.mbid && (
              <AlbumCover mbid={item.mbid} alt={item.name + " album cover"} />
            )}
            {item.isbn && (
              <BookImage
                isbn13={item.isbn}
                alt={item.name + " book cover"}
                size="S"
                quality="L"
              />
            )}
            <div className="flex flex-col gap-2 p-2">
              <Link to={item.url} className="text-lg font-bold">
                {item.name}
              </Link>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const pageInfo: page = {
  path: "/recommendations",
  name: "Recommendations",
  Component: Recommendations,
  showInNavbar: true,
  background: "bg-rounded",
};
