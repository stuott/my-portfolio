/**
 * @description This file contains TypeScript interfaces used throughout the application.
 */

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export interface Page {
  path: string;
  name: string;
  Component: () => JSX.Element;
  showInNavbar: boolean;
  background?: string;
}

export interface ButtonInfo {
  onClick: () => void;
  icon?: IconDefinition;
  children?: React.ReactNode;
}

export interface LinkInfo {
  to: string;
  icon?: IconDefinition;
  internal?: boolean;
  children?: React.ReactNode;
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
