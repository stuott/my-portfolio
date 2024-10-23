# Steven Ott's Portfolio Website

Welcome to my portfolio website repo!

The main structure is a React app that uses tailwind css for styling.

## Breakdown of `/app/src`

`App.tsx` - the main component of the entire website, rendering the navbar, page content, and footer

`/components` - all of the React components which are used throughout the website, broken down more specifically into `common`, `education`, `home`, and `projects`

> `/components/common` - components which might be useful more >generally throughout the entire website
>
> `/components/education` - components which are specific to the education page
>
> `/components/home` - components which are specific to the home page
>
> `/components/projects` - components which are specific to the projects page

`/data` - json data which is used to programmatically render different features on the website, making it easier to come back and update this information later

`/types` - typescript definitions of types that are used throughout the website

## Common components

### Badges

Renders as a list of colored tags containing a list of input strings. Perfect for highlighting tools or important aspects of a topic right near the title

### IconTable

Displays a list of icons with optional links attached to them. Currently only used in the home page 'about' section, it can be more useful generally when there are many pages to link out to.

### Section

Renders a separate section on a single page, useful when a page has many distinct components that each have a separate title and should be separated visually.

### Timeline

A generic display of events over a period. Each entry must have an associated time/period and title, with optional badges, subtitle, and points to display beneath.
