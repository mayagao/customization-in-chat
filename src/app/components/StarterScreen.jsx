// StarterScreen.jsx
import React, { useEffect, useContext, useRef, useState } from "react";
import Image from "next/image";
import { RepoIcon } from "@primer/octicons-react";
import StarterQuestions from "./StarterQuestions";
import StreamingOutput from "./StreamingOutput"; // Import the new component
import { fetchOpenAIResponse } from "../utils/openai";
import ReactMarkdown from "react-markdown";

import { ChatContext } from "../contexts/ChatContext";

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

  const STEP_DELAY = 1000; // Define the delay constant here

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
          {/* Display Prompt at the Top */}
          {displayPrompt && (
            <p className="text-lg font-semibold mb-4">
              <strong>Prompt:</strong> {displayPrompt}
            </p>
          )}
          {/* Reasoning Process */}
          <div>
            {allStepsLoaded && (
              <div>
                <strong>Reasoning Process:</strong>
                <button
                  onClick={toggleShowAllSteps}
                  className="text-blue-500 ml-2"
                >
                  {showAllSteps ? "Hide all" : "Show all"}
                </button>
              </div>
            )}

            {allStepsLoaded ? (
              showAllSteps ? (
                <ul>
                  {reasoningProcess.map((step, idx) => (
                    <li key={idx}>
                      <div>{step.title}</div>
                      <div className="text-gray-500 ml-2">
                        {step.description.map((m, i) => (
                          <div key={i}>{m}</div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )
            ) : (
              <div>
                <p>{reasoningProcess[currentStep].title}</p>
              </div>
            )}
          </div>

          <ReactMarkdown>{output}</ReactMarkdown>
          <ul>
            {sources.map((source, idx) => (
              <React.Fragment key={idx}>
                {idx === 0 && <strong>Sources:</strong>}
                <li>{`${source.type} : ${source.name} ${
                  source.path ? `(${source.path})` : ""
                }`}</li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StarterScreen;
