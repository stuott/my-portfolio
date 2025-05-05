import { Link } from "@components/controls";
import Collapsible from "@components/layout/Collapsible";
import { audioPlayerManager } from "@utilities/audioContext";
import DOMPurify from "dompurify";
import { useEffect, useRef } from "react";
import { RssItem as RssItemType } from "types/rss";

interface RssItemProps {
  item: RssItemType;
  className?: string;
  visible: boolean;
}

const RssItem = ({ item, className = "", visible }: RssItemProps) => {
  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format the publication date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Register the audio element with the player manager on mount
  useEffect(() => {
    if (audioRef.current) {
      audioPlayerManager.registerAudioElement(audioRef.current);
    }
  }, []);

  // Determine if the RSS item has playable media
  const hasAudio =
    item.mediaUrl ||
    (item.enclosure &&
      item.enclosure.type &&
      item.enclosure.type.startsWith("audio/"));

  // Get the media URL from either dedicated mediaUrl field or enclosure
  const audioUrl = item.mediaUrl || (item.enclosure ? item.enclosure.url : "");

  // Apply visibility class
  const visibilityClass = visible ? "" : "hidden";

  const sanitizedDescription = DOMPurify.sanitize(item.description);

  // Only render the component content if it has some visibility
  // This improves performance while maintaining animation
  return (
    <div
      className={`rss-item ${visibilityClass} ${className} flex flex-col gap-2 bg-zinc-800 border border-zinc-700 border-2 p-4 rounded-xl shadow-lg hover:border-zinc-500 transition-colors duration-200`}
    >
      <h3 className="text-xl font-bold">{item.title}</h3>
      {item.pubDate && (
        <p className="text-sm text-zinc-400">
          Published: {formatDate(item.pubDate)}
        </p>
      )}
      <Collapsible
        buttonTextClosed="show description"
        buttonTextExpanded="hide description"
      >
        <div
          className="text-zinc-300 line-clamp-5"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </Collapsible>

      {hasAudio && (
        <div className="mt-2 pt-2 border-t border-zinc-700">
          <audio
            ref={audioRef}
            controls
            src={audioUrl}
            className="w-full"
            preload="none"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="mt-auto pt-2">
        <Link to={item.link}>Read More</Link>
      </div>
    </div>
  );
};

export default RssItem;
