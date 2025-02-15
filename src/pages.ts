type background =
  | "bg-transparent"
  | "bg-zinc-900"
  | "bg-zinc-800"
  | "bg-map"
  | "bg-cube"
  | "bg-sudoku"
  | "bg-intersect";

export interface page {
  path: string;
  registerPath?: string;
  name: string;
  Component: () => React.ReactElement;
  showInNavbar: boolean;
  background?: background;
}

/**
 * Dynamically imports all page components from the `./pages` directory
 * @returns A promise that resolves to an array of page objects
 */
export const getPages = (): page[] => {
  const pages: page[] = [];
  const modules = import.meta.glob<page>("./pages/*.tsx", {
    eager: true,
    import: "pageInfo",
  });

  for (const path in modules) {
    const pageInfo = modules[path];
    if (pageInfo) {
      pages.push(pageInfo);
    }
  }

  return pages;
};
