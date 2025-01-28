import classNames from "classnames";
import { useEffect, useId, useState } from "react";
import Button from "./Button";

interface CollapsibleProps {
  children: React.ReactNode;
  buttonTextClosed?: string;
  buttonTextExpanded?: string;
  buttonBelow?: boolean;
  buttonCenter?: boolean;
  buttonClasses?: string;
}

const Collapsible = ({
  children,
  buttonTextClosed,
  buttonTextExpanded,
  buttonBelow,
  buttonCenter,
  buttonClasses,
}: CollapsibleProps) => {
  const [showMore, setShowMore] = useState(false);
  const growDivID = useId();

  useEffect(() => {
    updateHiddenPoints();
  }, [showMore]);

  const updateHiddenPoints = () => {
    let growDiv = document.getElementById(growDivID);
    let hiddenHeight = 0;

    if (!growDiv?.children) {
      return;
    }

    if (showMore) {
      for (const child of growDiv?.children) {
        hiddenHeight += child.clientHeight;
      }
      growDiv.style.height = hiddenHeight + "px";
    } else {
      growDiv.style.height = "0px";
    }
  };

  addEventListener("resize", updateHiddenPoints);

  const hiddenPointsClasses = classNames(
    "transition-all duration-1000 overflow-hidden ease-in-out h-0",
    {
      "bg-rose-800/20": !showMore,
      "bg-transparent ": showMore,
    }
  );

  const buttonText = showMore
    ? buttonTextExpanded ?? "show less"
    : buttonTextClosed ?? "show more";

  if (!children) {
    return null;
  }

  const buttonDivClasses = classNames("flex", {
    "justify-center": buttonCenter,
  });

  const button = (
    <div className={buttonDivClasses}>
      <Button
        className={"bg-rose-900/30 hover:bg-rose-900/50 " + buttonClasses}
        onClick={() => setShowMore(!showMore)}
      >
        {buttonText}
      </Button>
    </div>
  );

  return (
    <>
      {!buttonBelow && button}
      <div id={growDivID} className={hiddenPointsClasses}>
        {children}
      </div>
      {buttonBelow && button}
    </>
  );
};

export default Collapsible;
