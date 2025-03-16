import Button from "@components/controls/Button";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useEffect, useId, useState } from "react";

interface CollapsibleProps {
  children: React.ReactNode;
  buttonTextClosed?: string;
  buttonTextExpanded?: string;
  buttonBelow?: boolean;
  buttonCenter?: boolean;
  buttonClasses?: string;
  buttonIconClosed?: IconDefinition;
  buttonIconExpanded?: IconDefinition;
  buttonBg?: string;
  buttonHoverBg?: string;
  startOpen?: boolean;
}

const Collapsible = ({
  children,
  buttonTextClosed,
  buttonTextExpanded,
  buttonBelow,
  buttonCenter,
  buttonClasses,
  buttonIconClosed,
  buttonIconExpanded,
  buttonBg = "bg-rose-900/30",
  buttonHoverBg = "hover:bg-rose-900/50",
  startOpen = false,
}: CollapsibleProps) => {
  const [showMore, setShowMore] = useState(startOpen);
  const growDivID = useId();

  useEffect(() => {
    updateHeight();
  }, [showMore]);

  const updateHeight = () => {
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

  addEventListener("resize", updateHeight);

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
    "mt-4": buttonBelow,
    "mb-4": !buttonBelow,
  });

  const buttonElementClasses = classNames(
    buttonBg,
    buttonHoverBg,
    buttonClasses
  );

  const button = (
    <div className={buttonDivClasses}>
      <Button
        icon={showMore ? buttonIconExpanded : buttonIconClosed}
        className={buttonElementClasses}
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
