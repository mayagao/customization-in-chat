import React, { useContext } from "react";
import { CodeIcon, BookIcon, ChecklistIcon } from "@primer/octicons-react";
import { fetchOpenAIResponse } from "../utils/openai";
import { ChatContext } from "../contexts/ChatContext";

const StarterQuestions = ({ currentCopilot, currentRepo }) => {
  console.log("StarterQuestions component rendered"); // This should show in the console

  const { setResponse } = useContext(ChatContext);

  const buttonClasses =
    "w-auto max-w-full h-[36px] py-1 px-3 border rounded-full border-gray-300 hover:bg-gray-100 truncate";

  // Button Click Handler
  const handleButtonClick = (prompt) => {
    console.log("handleButtonClick triggered with prompt:", prompt);

    setResponse(""); // Clear previous response
    // fetchOpenAIResponse(prompt, setResponse); // Generate response
  };

  // Helper function to create a starter question button
  const createStarterQuestion = (IconComponent, title, label, prompt) => (
    <button
      key={label} // Add a key for unique identification in list
      className={buttonClasses}
      onClick={() => handleButtonClick(prompt)}
    >
      <IconComponent className="mr-2 text-gray-500" />
      <span className="font-medium py-1 mr-2">{title}</span>
      <span className="text-gray-500">{label}</span>
      <span className="hidden">{prompt}</span> {/* Hidden prompt for AI */}
    </button>
  );

  // Generate buttons based on the currentCopilot and currentRepo
  const getQuestions = () => {
    if (currentCopilot === "Core Engineering") {
      return [
        createStarterQuestion(
          CodeIcon,
          "Best practices",
          "Eng guideline deployment process?",
          "Please provide best practices for the engineering guideline deployment process."
        ),
        createStarterQuestion(
          BookIcon,
          "Code knowledge",
          "How does offline eval work?",
          "Explain how the offline evaluation process works in detail."
        ),
        createStarterQuestion(
          ChecklistIcon,
          currentRepo === "Repo-specific" ? "About this repo" : "Summarize",
          currentRepo === "Repo-specific"
            ? "Walk me through the codebase"
            : "Help me summarize my day",
          currentRepo === "Repo-specific"
            ? "Please walk me through the codebase of this specific repository."
            : "Help me plan and organize my day effectively."
        ),
      ];
    } else if (currentCopilot === "Backend API") {
      return [
        createStarterQuestion(
          CodeIcon,
          "API Design",
          "What’s the process of creating a new skill?",
          "Describe the process of designing and creating a new API skill."
        ),
        createStarterQuestion(
          BookIcon,
          "Code knowledge",
          "How does offline eval work?",
          "Explain how the offline evaluation process works in detail."
        ),
        createStarterQuestion(
          ChecklistIcon,
          currentRepo === "Repo-specific" ? "About this PR" : "Process",
          currentRepo === "Repo-specific"
            ? "Perform an API review on this PR"
            : "How to deploy a new skill?",
          currentRepo === "Repo-specific"
            ? "Perform a detailed API review on this pull request."
            : "Provide a step-by-step guide on deploying a new skill."
        ),
      ];
    } else if (currentCopilot === "Copilot") {
      return [
        createStarterQuestion(
          CodeIcon,
          "Get started",
          "What kind of questions can I ask?",
          "List the types of questions I can ask to get started with Copilot."
        ),
        createStarterQuestion(
          BookIcon,
          "Code knowledge",
          "How to contribute to this repo?",
          "Provide a detailed guide on how to contribute to this repository."
        ),
        createStarterQuestion(
          ChecklistIcon,
          "Explain",
          "Explain to me this method",
          "Explain the functionality and purpose of this method in detail."
        ),
      ];
    }
    return [];
  };

  return (
    <div className="flex flex-col items-center w-full gap-2 pt-2">
      {getQuestions().map((question) => question)}
    </div>
  );
};

export default StarterQuestions;
