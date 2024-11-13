/**
 * @description This file contains TypeScript interfaces used throughout the application.
 */

export interface Page {
    path: string;
    name:string;
    Component: () => JSX.Element;
    showInNavbar: boolean;
}

export interface Icon {
    element: JSX.Element;
    url: string;
}

interface Experience {
    title: string;
    company: string;
    companyURL: string;
    location: string;
    time: string;
    points: string[];
    skills: string[];
}