export interface book {
  index: number;
  title: string;
  series?: string;
  series_number?: number;
  author: string;
  genre: string;
  year: number;
  description?: string[];
}
