import Image from "next/image";

// ActionBar.jsx
import {
  ThreeBarsIcon,
  KebabHorizontalIcon,
  ScreenFullIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@primer/octicons-react";

import { useState } from "react";

const ActionBar = ({
  currentCopilot,
  onToggleMenu,
  onExpandWindow,
  onReset,
  displayPrompt,
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleHamburgerClick = () => {
    // Toggle the entire content area to show a menu or sidebar
    onToggleMenu();
  };

  const handleEllipsisClick = () => {
    // Toggle popover visibility
    setPopoverOpen(!isPopoverOpen);
  };

  const handleExpandClick = () => {
    // Expand the window width
    onExpandWindow();
  };

  const buttonClasses =
    "text-gray-500 h-[32px] w-[32px] rounded-md hover:bg-gray-100 hover:text-gray-700 cursor-pointer flex items-center justify-center";
  return (
    <div className="h-[48px] w-full flex items-center rounded-tl-lg rounded-tr-lg px-2 py-2 bg-white border-b border-gray-300">
      {/* Hamburger Menu */}
      <button
        className={`${buttonClasses} mr-2`}
        title="Menu"
        onClick={handleHamburgerClick}
      >
        <ThreeBarsIcon />
      </button>

      {/* Title updated based on selected filter */}
      <button className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 mr-auto w-[calc(100%-200px)]">
        <Image
          label={currentCopilot}
          alt={currentCopilot}
          src={
            currentCopilot === "Core Engineering"
              ? "/assets/images/core-engineering-icon.png"
              : currentCopilot === "Backend API"
              ? "/assets/images/backend-api-icon.png"
              : "/assets/images/copilot-icon.png"
          }
          width="20"
          height="20"
          className="mr-1 border border-gray-300 border-opacity-50 rounded-full"
        />
        <span className="ml-1 font-medium truncate">
          {displayPrompt ? displayPrompt : "Untitled"}
        </span>
      </button>

      {/* More Options (Ellipsis) */}
      <div
        className={`${buttonClasses}`}
        title="More actions"
        onClick={handleEllipsisClick}
      >
        <KebabHorizontalIcon />
        {isPopoverOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg p-2">
            <p className="text-sm text-gray-700">Option 1</p>
            <p className="text-sm text-gray-700">Option 2</p>
            <p className="text-sm text-gray-700">Option 3</p>
          </div>
        )}
      </div>

      {/* Fullscreen Button */}
      <button
        className={`${buttonClasses} mr-2`}
        title="Full screen"
        onClick={handleExpandClick}
      >
        <ScreenFullIcon />
      </button>
      <div className="h-[24px] border-r border-gray-300"></div>
      {/* Plus (New Action) */}
      <button
        className={`${buttonClasses} ml-2`}
        title="New action"
        onClick={onReset}
      >
        <PlusIcon />
      </button>

      {/* Dropdown Icon */}
      <button className={buttonClasses} title="Dropdown">
        <ChevronDownIcon />
      </button>
    </div>
  );
};

export default ActionBar;
