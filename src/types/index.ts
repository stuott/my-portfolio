/**
 * @description This file contains TypeScript interfaces used throughout the application.
 */

import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { jsx } from "react/jsx-runtime";

export interface Page {
  path: string;
  registerPath?: string;
  name: string;
  Component: () => React.ReactElement;
  showInNavbar: boolean;
  background?: string;
}

export interface ButtonInfo {
  onClick?: () => void;
  icon?: IconDefinition;
  children?: React.ReactNode;
}

export interface LinkInfo {
  to: string;
  icon?: IconDefinition;
  iconSize?: SizeProp;
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
