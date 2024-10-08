// StarterScreen.jsx
import React, { useContext } from "react";
import Image from "next/image";
import { RepoIcon } from "@primer/octicons-react";
import StarterQuestions from "./StarterQuestions";
import StreamingOutput from "./StreamingOutput"; // Import the new component

import { ChatContext } from "../contexts/ChatContext";

const StarterScreen = ({ currentCopilot, currentRepo }) => {
  const { response } = useContext(ChatContext);

  // Convert response text into HTML format
  const formattedResponse = response
    ? response
        .split("\n")
        .map((line) => `<p>${line}</p>`)
        .join("")
    : "";

  return (
    <div>
      {!response ? (
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
            />
          </div>
        </div>
      ) : (
        <div
          className="response-screen p-4"
          dangerouslySetInnerHTML={{ __html: formattedResponse }}
        />
      )}
    </div>
  );
};

export default StarterScreen;
