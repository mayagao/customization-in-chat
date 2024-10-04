import React, { useState } from "react";
import Popover from "./Popover";

// ActionBar.jsx
import {
  PlusCircleIcon,
  DiffIgnoredIcon,
  MentionIcon,
  PaperAirplaneIcon,
} from "@primer/octicons-react";

const InputArea = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(null);

  const togglePopover = (buttonType) => {
    setPopoverOpen((prev) => (prev === buttonType ? null : buttonType));
  };
  const buttonClasses =
    "text-gray-500 flex mr-1 items-center justify-center h-[28px] w-[28px] rounded-md hover:bg-gray-100 hover:text-gray-700 cursor-pointer flex items-center";
  return (
    <div className="px-4 py-4">
      <div className="px-2 py-1 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        {/* Input Field */}
        <input
          type="text"
          className="w-full px-2 py-2  text-gray-600 placeholder-gray-400 focus:outline-none"
          placeholder="Start typing..."
        />

        <div className="w-full flex items-center mt-1 mb-1">
          <Popover
            isOpen={isPopoverOpen === "plus"}
            onClose={() => setPopoverOpen(null)}
            content={<div>Popover content for plus button</div>}
          >
            <button
              className={buttonClasses}
              onClick={() => togglePopover("plus")}
            >
              <PlusCircleIcon className="" />
            </button>
          </Popover>

          {/* Pen Button */}
          <Popover
            isOpen={isPopoverOpen === "pen"}
            onClose={() => setPopoverOpen(null)}
            content={<div>Popover content for pen button</div>}
          >
            <button
              className={buttonClasses}
              onClick={() => togglePopover("pen")}
            >
              <DiffIgnoredIcon className="" />
            </button>
          </Popover>

          {/* At Button */}
          <Popover
            isOpen={isPopoverOpen === "at"}
            onClose={() => setPopoverOpen(null)}
            content={<div>Popover content for at button</div>}
          >
            <button
              className={buttonClasses}
              onClick={() => togglePopover("at")}
            >
              <MentionIcon className="" />
            </button>
          </Popover>

          {/* Send Button */}
          <div className="ml-auto">
            <button className={buttonClasses}>
              <PaperAirplaneIcon className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
