/**
 * @description This file contains TypeScript interfaces used throughout the application.
 */

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Page {
  path: string;
  name: string;
  Component: () => JSX.Element;
  showInNavbar: boolean;
}

export interface IconLink {
  icon: IconDefinition;
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
