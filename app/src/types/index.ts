/**
 * @description This file contains TypeScript interfaces used throughout the application.
 */

export interface Page {
    path: string;
    name:string;
    Component: () => JSX.Element;
}

export interface Icon {
    element: JSX.Element;
    url: string;
}