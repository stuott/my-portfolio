export interface book {
  isbn10?: string;
  isbn13: string;
  title: string;
  series?: string;
  series_number?: number;
  author: string;
  genre: string;
  year: number;
  description?: string[];
  rating?: number;
}
