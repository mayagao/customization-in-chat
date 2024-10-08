import ActionBar from "./ActionBar";
import StarterScreen from "./StarterScreen";
import InputArea from "./InputArea";
import { useState } from "react";
import { ChatProvider } from "../contexts/ChatContext";
import { ChatContext } from "../contexts/ChatContext";

const ChatWindow = ({ currentCopilot, currentRepo }) => {
  const [response, setResponse] = useState("");
  const [displayPrompt, setDisplayPrompt] = useState("");
  const [isReset, setIsReset] = useState(false); // Add reset state

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

  // Reset function to clear response and prompt
  const reset = () => {
    setIsReset(true);
    setTimeout(() => setIsReset(false), 0); // Reset `isReset` back to false after triggering
  };

  return (
    <ChatProvider>
      <div
        style={{
          boxShadow:
            "0px 8px 24px 0px rgba(66, 74, 83, 0.12), 0px 1px 3px 0px rgba(31, 35, 40, 0.12)",
        }}
        className="floating-window flex flex-col  bg-white w-[440px] h-[calc(100vh-140px)] clip mx-auto mt-5 min-h-[400px] rounded-lg border"
      >
        <ActionBar
          currentCopilot={currentCopilot}
          onToggleMenu={handleToggleMenu}
          onExpandWindow={handleExpandWindow}
          onReset={reset} // Pass reset to ActionBar
        />
        {!isMenuOpen ? (
          <div className="flex-grow flex flex-col">
            <StarterScreen
              currentCopilot={currentCopilot}
              currentRepo={currentRepo}
              response={response} // Pass response and prompt
              setResponse={setResponse}
              displayPrompt={displayPrompt}
              setDisplayPrompt={setDisplayPrompt}
              reset={isReset}
            />
            <InputArea />
          </div>
        ) : (
          <div className="main-content p-6">This is the main content area.</div>
        )}
      </div>{" "}
    </ChatProvider>
  );
};

export default ChatWindow;
