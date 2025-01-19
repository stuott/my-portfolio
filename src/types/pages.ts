export interface page {
  path: string;
  registerPath?: string;
  name: string;
  Component: () => React.ReactElement;
  showInNavbar: boolean;
  background?: string;
}
