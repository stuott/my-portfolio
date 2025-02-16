import { Link } from "@components/controls";
import { Section } from "@components/layout";
import AlbumCover from "@components/music/AlbumCover";
import data from "@data/recommendations.json";
import {
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
  id?: string;
}

const Recommendations = () => {
  const { recommendations } = data;
  return (
    <>
      <Section title="Recommendations">
        <p>last updated: 2/15/2025</p>
        <RecommendationCards
          title="Websites"
          icon={faGlobe}
          items={recommendations.websites}
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
      </Section>
    </>
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
      <div className="flex flex-col gap-4">
        {items.map((item: recommendation, index: number) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-2 bg-zinc-900/40 p-4"
          >
            {item.id && <AlbumCover mbid={item.id} />}
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
