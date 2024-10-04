import ActionBar from "./ActionBar";
import StarterScreen from "./StarterScreen";
import InputArea from "./InputArea";
import { useState } from "react";

const ChatWindow = ({ currentSection, additionalState }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleMenu = () => {
    // Toggle between the main content and a sidebar menu
    setMenuOpen(!isMenuOpen);
  };

  const handleExpandWindow = () => {
    // Toggle between normal and expanded window
    setExpanded(!isExpanded);
  };
  return (
    <div
      style={{
        boxShadow:
          "0px 8px 24px 0px rgba(66, 74, 83, 0.12), 0px 1px 3px 0px rgba(31, 35, 40, 0.12)",
      }}
      className="floating-window flex flex-col  bg-white w-[440px] h-[calc(100vh-140px)] clip mx-auto mt-5 min-h-[400px] rounded-lg border"
    >
      <ActionBar
        currentSection={currentSection}
        onToggleMenu={handleToggleMenu}
        onExpandWindow={handleExpandWindow}
      />
      {!isMenuOpen ? (
        <div className="flex-grow flex flex-col">
          <StarterScreen
            currentSection={currentSection}
            additionalState={additionalState}
          />
          <InputArea />
        </div>
      ) : (
        <div className="main-content p-6">This is the main content area.</div>
      )}
    </div>
  );
};

export default ChatWindow;
