import { Button } from "@components/controls";
import Checkbox from "@components/controls/Checkbox";
import Dropdown from "@components/controls/Dropdown";
import TextInput from "@components/controls/TextInput";
import { Section } from "@components/layout";
import { RssItem } from "@components/rss";
import {
  faArrowLeft,
  faArrowRight,
  faColumns,
  faRss,
  faSearch,
  faTh,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { page } from "pages";
import { useCallback, useEffect, useState } from "react";
import { RssFeed, RssItem as RssItemType } from "types/rss";

// View mode types
type ViewMode = "list" | "individual";

// Number of items per page in list view
const ITEMS_PER_PAGE = 10;

// Common developer-focused RSS feeds
const commonRssFeeds = [
  { label: "Select a feed...", value: "" },
  { label: "CSS-Tricks", value: "https://css-tricks.com/feed/" },
  { label: "Dev.to", value: "https://dev.to/feed" },
  { label: "Hacker News", value: "https://news.ycombinator.com/rss" },
  { label: "JavaScript Weekly", value: "https://javascriptweekly.com/rss" },
  { label: "React Status", value: "https://react.statuscode.com/rss" },
  { label: "Frontend Focus", value: "https://frontendfoc.us/rss" },
  {
    label: "Smashing Magazine",
    value: "https://www.smashingmagazine.com/feed",
  },
  { label: "GitHub Blog", value: "https://github.blog/feed/" },
];

// Item limit options
const itemLimitOptions = [
  { label: "5 items", value: "5" },
  { label: "10 items", value: "10" },
  { label: "15 items", value: "15" },
  { label: "20 items", value: "20" },
  { label: "25 items", value: "25" },
];

const RssFeedReader = () => {
  const [feedUrl, setFeedUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");
  const [feed, setFeed] = useState<RssFeed | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentItems, setRecentItems] = useState<RssItemType[]>([]);
  const [itemLimit, setItemLimit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<RssItemType[]>([]);
  const [searchInDescription, setSearchInDescription] =
    useState<boolean>(false);
  const [visibleItemIds, setVisibleItemIds] = useState<Set<string>>(new Set());

  // View mode and navigation state
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

  // Calculate total pages based on filtered items
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIdx = currentPage * ITEMS_PER_PAGE;
    return filteredItems.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  };

  // Navigation handlers
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextItem = () => {
    if (currentItemIndex < filteredItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const goToPrevItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  // Handle view mode toggle
  const toggleViewMode = () => {
    if (viewMode === "list") {
      setViewMode("individual");
      // Start individual view with current page's first visible item
      const startIdx = currentPage * ITEMS_PER_PAGE;
      const visibleItems = getCurrentPageItems();
      if (visibleItems.length > 0) {
        // Find first visible item index in the overall filtered items list
        setCurrentItemIndex(startIdx);
      }
    } else {
      setViewMode("list");
      // When going back to list view, set page to where current item would be
      setCurrentPage(Math.floor(currentItemIndex / ITEMS_PER_PAGE));
    }
  };

  const fetchRssFeed = useCallback(
    async (url: string) => {
      if (!url) return;

      setLoading(true);
      setError(null);
      setFeed(null);

      try {
        // Use a CORS proxy to avoid CORS issues
        const corsProxy = "https://api.allorigins.win/raw?url=";
        const response = await fetch(`${corsProxy}${encodeURIComponent(url)}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch RSS feed: ${response.status}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        // Check if the XML is valid and has RSS structure
        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
          throw new Error("The provided URL does not contain valid RSS XML");
        }

        const channelElement = xmlDoc.querySelector("channel");
        if (!channelElement) {
          throw new Error("No RSS channel found in the feed");
        }

        // Parse RSS feed data
        const feedData: RssFeed = {
          title:
            channelElement.querySelector("title")?.textContent ||
            "Unknown Feed",
          description:
            channelElement.querySelector("description")?.textContent || "",
          link: channelElement.querySelector("link")?.textContent || "",
          items: [],
          lastBuildDate:
            channelElement.querySelector("lastBuildDate")?.textContent ?? "",
          imageUrl:
            channelElement.querySelector("image > url")?.textContent ?? "",
        };

        console.log("XML structure:", xmlDoc.documentElement.outerHTML);

        // Get all item elements and convert them to our RssItem type
        const itemElements = Array.from(xmlDoc.querySelectorAll("item"));
        feedData.items = itemElements.map((item) => {
          // Check for enclosures (podcast audio files, etc.)
          const enclosureElement = item.querySelector("enclosure");
          const enclosure = enclosureElement
            ? {
                url: enclosureElement.getAttribute("url") || "",
                type: enclosureElement.getAttribute("type") || "",
                length: Number(enclosureElement.getAttribute("length")) || 0,
              }
            : undefined;

          // Extract media URLs from various common formats
          let mediaUrl = "";

          // Check for enclosure with audio type
          if (
            enclosure?.type &&
            enclosure.type.startsWith("audio/") &&
            enclosure.url
          ) {
            mediaUrl = enclosure.url;
          }

          // Check for media:content element (used by some RSS feeds)
          if (!mediaUrl) {
            const mediaContent = item.querySelector("media\\:content, content");
            if (
              mediaContent &&
              mediaContent.getAttribute("type")?.startsWith("audio/")
            ) {
              mediaUrl = mediaContent.getAttribute("url") || "";
            }
          }

          // Check for itunes:enclosure (used by podcast feeds)
          if (!mediaUrl) {
            const itunesEnclosure = item.querySelector("itunes\\:enclosure");
            if (itunesEnclosure) {
              mediaUrl = itunesEnclosure.getAttribute("url") || "";
            }
          }

          return {
            title: item.querySelector("title")?.textContent || "Untitled",
            link: item.querySelector("link")?.textContent || "#",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            author:
              item.querySelector("author")?.textContent ??
              item.querySelector("itunes\\:author")?.textContent ??
              "",
            content:
              item.querySelector("[nodeName='content:encoded']")?.textContent ??
              "",
            guid: item.querySelector("guid")?.textContent ?? "",
            enclosure,
            mediaUrl,
          };
        });

        setFeed(feedData);
        // Get the most recent items (up to the selected limit)
        const sortedItems = feedData.items.sort((a, b) => {
          return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        });

        setRecentItems(sortedItems.slice(0, itemLimit));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
    [itemLimit]
  );

  const handleSubmit = () => {
    setFeedUrl(inputUrl);
  };

  const handleFeedSelect = (value: string) => {
    if (value) {
      setInputUrl(value);
      setFeedUrl(value);
    }
  };

  const handleLimitChange = (value: string) => {
    setItemLimit(Number(value));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (feedUrl) {
      fetchRssFeed(feedUrl);
    }
  }, [feedUrl, fetchRssFeed]);

  // Update recent items when the item limit changes or when feed changes
  useEffect(() => {
    if (feed && feed.items) {
      const sortedItems = [...feed.items].sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
      setRecentItems(sortedItems.slice(0, itemLimit));
    }
  }, [feed, itemLimit]);

  // Filter items based on search term and update visibility state
  useEffect(() => {
    // If no search term, all items are visible
    if (searchTerm.trim() === "") {
      setFilteredItems(recentItems);
      // Create a set of all item IDs (using guid or index as fallback)
      const newVisibleIds = new Set(
        recentItems.map(
          (item) => item.guid || `item-${recentItems.indexOf(item)}`
        )
      );
      setVisibleItemIds(newVisibleIds);
      return;
    }

    // Filter based on search term and search options
    const term = searchTerm.toLowerCase();
    const filtered = recentItems.filter((item) =>
      searchInDescription
        ? item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
        : item.title.toLowerCase().includes(term)
    );

    setFilteredItems(filtered);

    // Update visible item IDs
    const newVisibleIds = new Set(
      filtered.map((item) => item.guid || `item-${recentItems.indexOf(item)}`)
    );
    setVisibleItemIds(newVisibleIds);
  }, [searchTerm, recentItems, searchInDescription]);

  return (
    <Section title="RSS Feed Reader" className="space-y-6">
      <div className="bg-zinc-900 p-6 border border-zinc-700 rounded">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Dropdown
                options={commonRssFeeds}
                setSelection={handleFeedSelect}
                placeholder="Select a common feed"
              />
            </div>
            <p className="text-center self-center hidden sm:block text-zinc-400">
              or
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <TextInput
              className="flex-grow"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter RSS feed URL (e.g., https://news.example.com/feed)"
            />
            <Button
              icon={faRss}
              onClick={handleSubmit}
              disabled={loading || !inputUrl}
              className="px-6 py-2 whitespace-nowrap"
            >
              {loading ? "Loading..." : "Load Feed"}
            </Button>
          </form>

          <div className="flex justify-end">
            <div className="w-36">
              <label className="text-sm text-zinc-400 mb-1 block">Show</label>
              <Dropdown
                options={itemLimitOptions}
                setSelection={handleLimitChange}
                defaultValue={itemLimit.toString()}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded text-red-200">
            {error}
          </div>
        )}
      </div>

      {feed && (
        <div className="space-y-4">
          <div className="bg-zinc-800 p-4 border border-zinc-600 rounded">
            <h2 className="text-2xl font-bold">{feed.title}</h2>
            {feed.imageUrl && (
              <img
                src={feed.imageUrl}
                alt={`${feed.title} logo`}
                className="h-16 w-auto my-2"
              />
            )}
            <p className="text-zinc-300">{feed.description}</p>
            {feed.lastBuildDate && (
              <p className="text-sm text-zinc-400">
                Last updated: {feed.lastBuildDate}
              </p>
            )}
          </div>

          {recentItems.length > 0 && (
            <div className="bg-zinc-800 p-4 border border-zinc-600 rounded">
              <div className="flex items-center gap-2">
                <div className="text-zinc-400">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <TextInput
                  className="flex-grow"
                  placeholder="Search items by title..."
                  onChange={handleSearch}
                  value={searchTerm}
                />
                <Button
                  icon={faTimes}
                  onClick={handleClearSearch}
                  className="px-4 py-2"
                  disabled={!searchTerm}
                />
              </div>
              <div className="mt-2">
                <Checkbox
                  label="Search in descriptions"
                  checked={searchInDescription}
                  onChange={(e) => setSearchInDescription(e.target.checked)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">Recent Episodes</h3>
              {filteredItems.length > 0 && (
                <Button
                  icon={viewMode === "list" ? faColumns : faTh}
                  onClick={toggleViewMode}
                  className="ml-2"
                  tooltip={
                    viewMode === "list"
                      ? "Switch to Individual View"
                      : "Switch to List View"
                  }
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Top navigation controls - present in both modes */}
              {filteredItems.length > 0 && (
                <>
                  <Button
                    icon={faArrowLeft}
                    onClick={viewMode === "list" ? goToPrevPage : goToPrevItem}
                    disabled={
                      viewMode === "list"
                        ? currentPage === 0
                        : currentItemIndex === 0
                    }
                    className="px-2"
                  />
                  <span className="text-zinc-400 text-sm whitespace-nowrap">
                    {viewMode === "list"
                      ? `Page ${currentPage + 1}/${totalPages}`
                      : `Item ${currentItemIndex + 1}/${filteredItems.length}`}
                  </span>
                  <Button
                    icon={faArrowRight}
                    onClick={viewMode === "list" ? goToNextPage : goToNextItem}
                    disabled={
                      viewMode === "list"
                        ? currentPage >= totalPages - 1
                        : currentItemIndex >= filteredItems.length - 1
                    }
                    className="px-2"
                  />
                </>
              )}
              <p className="text-zinc-400 ml-4">
                {searchTerm
                  ? `Found ${filteredItems.length} items`
                  : `Showing ${recentItems.length} of ${feed.items.length} items`}
              </p>
            </div>
          </div>

          {/* List View Mode with Pagination */}
          {viewMode === "list" && filteredItems.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {getCurrentPageItems().map((item, index) => {
                  const itemId =
                    item.guid || `item-${currentPage * ITEMS_PER_PAGE + index}`;
                  return <RssItem key={itemId} item={item} visible={true} />;
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <Button
                    icon={faArrowLeft}
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    className="px-4"
                  >
                    Previous
                  </Button>
                  <div className="text-zinc-400">
                    Page {currentPage + 1} of {totalPages}
                  </div>
                  <Button
                    icon={faArrowRight}
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className="px-4"
                    flipped
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Individual View Mode */}
          {viewMode === "individual" && filteredItems.length > 0 && (
            <>
              <div className="flex flex-col">
                {filteredItems[currentItemIndex] && (
                  <div className="mb-6">
                    <RssItem
                      key={`individual-${currentItemIndex}`}
                      item={filteredItems[currentItemIndex]}
                      visible={true}
                    />
                  </div>
                )}
              </div>

              {/* Item Navigation Controls */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  icon={faArrowLeft}
                  onClick={goToPrevItem}
                  disabled={currentItemIndex === 0}
                  className="px-4"
                >
                  Previous
                </Button>
                <div className="text-zinc-400">
                  Item {currentItemIndex + 1} of {filteredItems.length}
                </div>
                <Button
                  icon={faArrowRight}
                  onClick={goToNextItem}
                  disabled={currentItemIndex >= filteredItems.length - 1}
                  className="px-4"
                  flipped
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {/* No items message */}
          {filteredItems.length === 0 && searchTerm && (
            <p className="text-center py-8 text-zinc-400 mt-2">
              No items match your search term.
            </p>
          )}
        </div>
      )}

      {!feed && !loading && !error && (
        <div className="text-center py-16">
          <p className="text-xl">Enter an RSS feed URL above to get started</p>
          <p className="text-zinc-400 mt-2">
            You'll see up to {itemLimit} most recent items from the feed
          </p>
        </div>
      )}
    </Section>
  );
};

export const pageInfo: page = {
  path: "/rss-feed",
  name: "RSS Feed",
  Component: RssFeedReader,
  showInNavbar: true,
  background: "bg-temple",
};
