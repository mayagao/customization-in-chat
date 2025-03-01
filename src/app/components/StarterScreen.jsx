// StarterScreen.jsx
import React, { useEffect, useContext, useRef, useState } from "react";
import Image from "next/image";

import StarterQuestions from "./StarterQuestions";
import StreamingOutput from "./StreamingOutput"; // Import the new component
import { fetchOpenAIResponse } from "../utils/openai";
import ReactMarkdown from "react-markdown";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  BookIcon,
  SearchIcon,
  NorthStarIcon,
  FileCodeIcon,
  TrackedByClosedCompletedIcon,
  RepoIcon,
  CopilotIcon,
} from "@primer/octicons-react";

import { ChatContext } from "../contexts/ChatContext";

const iconMap = {
  SearchIcon,
  BookIcon,
  NorthStarIcon,
  FileCodeIcon,
  RepoIcon,
  CopilotIcon,
  TrackedByClosedCompletedIcon,
};

const StarterScreen = ({
  currentCopilot,
  currentRepo,
  displayPrompt,
  setDisplayPrompt,
  reset,
  resetAll,
}) => {
  const { response, setResponse } = useContext(ChatContext);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalId = useRef(null);

  const [sources, setSources] = useState([]);
  const [reasoningProcess, setReasoningProcess] = useState([]);
  const [output, setOutput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [allStepsLoaded, setAllStepsLoaded] = useState(false);

  const STEP_DELAY = 1200; // Define the delay constant here

  const handleButtonClick = (prompt) => {
    // Stop any existing streaming interval if active
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setResponse(""); // Clear previous response

    setReasoningProcess([]);
    setOutput("");
    setSources([]);

    setCurrentStep(0);
    setShowAllSteps(false);
    setAllStepsLoaded(false);

    setTimeout(() => {
      setDisplayPrompt(prompt); // Set new prompt for display
      setIsStreaming(true); // Start streaming

      fetchOpenAIResponse(
        prompt,
        setReasoningProcess,
        setOutput,
        setSources,
        setCurrentStep,
        STEP_DELAY
      );
    }, 100); // Adjust the delay as needed
  };

  // Stop streaming when reset is called
  useEffect(() => {
    if (reset || resetAll) {
      clearInterval(intervalId.current);
      setIsStreaming(false);
      setResponse(false);
      setDisplayPrompt("");
      setShowAllSteps(false); // Start with collapsed view
      setCurrentStep(0);
      setOutput("");
      setSources([]);
      setReasoningProcess([]);
    }

    console.log(sources, reasoningProcess, currentStep);
  }, [reset, resetAll]);

  useEffect(() => {
    if (
      reasoningProcess.length > 0 &&
      currentStep < reasoningProcess.length - 1
    ) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, STEP_DELAY);
      return () => clearTimeout(timer);
    } else if (
      currentStep === reasoningProcess.length - 1 &&
      reasoningProcess.length > 0
    ) {
      setAllStepsLoaded(true);
    }
  }, [currentStep, reasoningProcess]);

  const toggleShowAllSteps = () => {
    setShowAllSteps((prev) => !prev);
  };

  const IconComponent =
    reasoningProcess[currentStep] &&
    iconMap[reasoningProcess[currentStep].icon]; // Get the icon from the map
  console.log(reasoningProcess[currentStep]);
  return (
    <div className="flex-1 overflow-y-auto text-gray-800 ">
      {!isStreaming && !response ? (
        <div className="starter-screen flex flex-col h-full">
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
        <div className="response-screen p-4 h-full flex-grow flex flex-col">
          {/* Display Prompt at the Top */}
          {displayPrompt && (
            <div className="br-4 text-gray-800 self-end rounded-lg w-5/6 py-3 bg-gray-100 block px-3 text-mini mb-4">
              {displayPrompt}
            </div>
          )}

          <div className="flex items-center mb-1">
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
            <div className="text-s font-medium">{currentCopilot}</div>
          </div>
          {/* Reasoning Process */}
          <div>
            {allStepsLoaded && (
              <div>
                <button
                  onClick={toggleShowAllSteps}
                  className="text-xs gap-1 text-gray-500 flex items-center py-1"
                >
                  Reasoning process{" "}
                  {showAllSteps ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
              </div>
            )}

            {allStepsLoaded ? (
              showAllSteps ? (
                <ul className="px-3 pb-0 pt-4 border rounded-lg reasoning-process mb-4">
                  {reasoningProcess.map((step, idx) => {
                    const IconComponent = iconMap[step.icon]; // Get the icon from the map
                    console.log(step.icon);
                    return (
                      <li key={idx} className="relative">
                        <div class="step-circle"></div>
                        <div className="step-container">
                          <div className="mb-1 text-xs text-gray-500 items-center flex">
                            <IconComponent className="mr-1 w-[12px] text-gray-500" />{" "}
                            {step.title}:
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {step.description.map((m, i) => (
                              <div key={i} className="inline text-xs ">
                                <span className="text-gray-800">
                                  {m}
                                  {i < step.description.length - 1 ? "," : ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <></>
              )
            ) : (
              <div>
                <div className="text-xs text-gray-500 flex items-center py-1 pb-2">
                  <IconComponent className="h-[12px] mr-1" />{" "}
                  {reasoningProcess[currentStep].title} ...
                </div>
                {reasoningProcess[currentStep].description.map((m, i) => {
                  return (
                    <div
                      className={`text-xs text-gray-600 flex items-center mb-1 pb-1`}
                      key={i}
                    >
                      {m}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mardown-output mt-2">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
          <ul>
            {sources.map((source, idx) => {
              const IconComponent = iconMap[source.type]; // Get the icon from the map
              return (
                <React.Fragment key={idx}>
                  {idx === 0 && (
                    <div>
                      <button
                        onClick={toggleShowAllSteps}
                        className="text-xs gap-1 text-gray-500 flex items-center  py-1"
                      >
                        Sources <ChevronUpIcon />
                      </button>
                    </div>
                  )}
                  <li className="flex items-center gap-2 truncate py-1">
                    <span
                      style={{ fontVariantNumeric: "tabular-nums" }}
                      className="text-gray-500 text-xs"
                    >
                      [{idx}]
                    </span>
                    <IconComponent className="text-gray-500" />
                    <span className="text-gray-800 ">{source.name} </span>
                    <span className="text-gray-500 text-xs truncate">
                      {source.path}
                    </span>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StarterScreen;
