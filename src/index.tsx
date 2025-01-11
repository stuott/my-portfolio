import { reportWebVitals } from "analytics";
import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga";
import App from "./App";
import "./index.css";

ReactGA.initialize("G-DBWJMWB5XZ");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="bg-zinc-900">
      <App />
    </div>
  </React.StrictMode>
);

// Reference: https://bit.ly/CRA-vitals
reportWebVitals(({ id, name, value }) => {
  ReactGA.event({
    category: "Web Vitals",
    action: name,
    nonInteraction: true,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    label: id,
  });
});
