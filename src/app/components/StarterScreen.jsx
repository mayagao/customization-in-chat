// StarterScreen.jsx
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RepoIcon } from "@primer/octicons-react";
import StarterQuestions from "./StarterQuestions";
import StreamingOutput from "./StreamingOutput"; // Import the new component

import { ChatContext } from "../contexts/ChatContext";

const StarterScreen = ({
  currentCopilot,
  currentRepo,
  response,
  setResponse,
  displayPrompt,
  setDisplayPrompt,
  reset,
}) => {
  // const { response, setResponse } = useContext(ChatContext);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalId = useRef(null); // Use useRef to store interval ID

  const fakeResponse = [
    "1. Start by creating a to-do list or schedule for the day.",
    "2. List out all the tasks and activities you need to accomplish.",
    "3. Prioritize your tasks based on importance and urgency.",
    "4. Break down larger tasks into smaller, more manageable tasks.",
    "5. Set specific time blocks for each task on your schedule.",
    "6. Build in time for breaks and relaxation to avoid burnout.",
    "7. Be realistic about what you can accomplish in a day.",
    "8. Stay focused and avoid distractions by turning off notifications.",
    "9. Review your progress throughout the day and adjust as needed.",
    "10. End your day by reflecting on what went well and planning for the next day.",
  ];

  const handleButtonClick = (prompt) => {
    // Stop any existing streaming interval if active
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    setResponse(""); // Clear previous response
    setDisplayPrompt(prompt); // Set prompt for display
    setIsStreaming(true); // Start streaming

    let index = 0;
    intervalId.current = setInterval(() => {
      if (index < fakeResponse.length) {
        setResponse(
          (prev) => prev + (index > 0 ? "\n" : "") + fakeResponse[index]
        );
        index++;
      } else {
        clearInterval(intervalId.current);
        intervalId.current = null; // Clear interval ID when done
        setIsStreaming(false);
      }
    }, 500);
  };

  // Stop streaming when reset is called
  useEffect(() => {
    if (reset) {
      clearInterval(intervalId.current); // Stop any ongoing interval
      setIsStreaming(false);
      setResponse(false);
      setDisplayPrompt("");
    }
  }, [reset]);

  return (
    <div>
      {!isStreaming && !response ? (
        <div className="starter-screen flex flex-col flex-grow">
          <button className="flex items-center px-2 ml-2 py-2 cursor-pointer text-gray-500 hover:text-gray-900 mr-4">
            <RepoIcon />
            {currentRepo === "Repo-specific" ? (
              <span className="ml-2">copilot-api</span>
            ) : (
              <span className="ml-2">Select a repo</span>
            )}
          </button>
          <div className="flex flex-col items-center w-full flex-grow justify-center px-4">
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
              width="32"
              height="32"
              className="mr-1 border-box shadow-inner border shadow-[inset_0_0_0_1px_rgba(0,0,0,1)] rounded-full"
            />
            <div className="text-xl font-semibold py-1">{currentCopilot}</div>
            <div className="text-center text-gray-500">
              Copilot is powered by AI, so mistakes are possible. Learn more
              about how Copilot chat works here.{" "}
            </div>

            <StarterQuestions
              currentCopilot={currentCopilot}
              currentRepo={currentRepo}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      ) : (
        <div className="response-screen p-4">
          <p>
            <strong>Prompt:</strong> {displayPrompt}
          </p>
          {response}
        </div>
      )}
    </div>
  );
};

export default StarterScreen;
