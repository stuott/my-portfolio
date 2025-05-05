export interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author?: string;
  content?: string;
  guid?: string;
  mediaUrl?: string;
  enclosure?: {
    url: string;
    type: string;
    length?: number;
  };
}

export interface RssFeed {
  title: string;
  description: string;
  link: string;
  items: RssItem[];
  lastBuildDate?: string;
  imageUrl?: string;
}
