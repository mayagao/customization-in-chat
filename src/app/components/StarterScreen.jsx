// StarterScreen.jsx
import { useState, useEffect } from "react";
import Image from "next/image";
// ActionBar.jsx
import { CodeIcon } from "@primer/octicons-react";

// ActionBar.jsx
import { RepoIcon, BookIcon, ChecklistIcon } from "@primer/octicons-react";

const StarterScreen = ({
  currentSection,
  onSectionChange,
  additionalState,
}) => {
  const [buttonText, setButtonText] = useState({
    bestPractices: "Best practices",
    codeKnowledge: "Code knowledge",
    summarize: "Summarize",
  });

  useEffect(() => {
    // Update all buttons when currentSection changes
    if (currentSection === "Core Engineering") {
      setButtonText({
        bestPractices: (
          <>
            <CodeIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">Best practices</span>
            <span className="text-gray-500">
              Eng guideline deployment process?
            </span>
          </>
        ),
        codeKnowledge: (
          <>
            <BookIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">Code knowledge</span>
            <span className="text-gray-500">How does offline eval work?</span>
          </>
        ),
        summarize: (
          <>
            <ChecklistIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">
              {additionalState === "Repo-specific"
                ? "About this repo"
                : "Summarize"}
            </span>
            <span className="text-gray-500">
              {additionalState === "Repo-specific"
                ? "Walk me through the codebase"
                : "Help me summarize my day"}
            </span>
          </>
        ),
      });
    } else if (currentSection === "Backend API") {
      setButtonText({
        bestPractices: (
          <>
            <CodeIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">API Design</span>
            <span className="text-gray-500">
              What’s the process of creating a new skill?
            </span>
          </>
        ),
        codeKnowledge: (
          <>
            <BookIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">Code knowledge</span>
            <span className="text-gray-500">How does offline eval work?</span>
          </>
        ),
        summarize: (
          <>
            <ChecklistIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">
              {additionalState === "Repo-specific"
                ? "About this PR"
                : "Process"}
            </span>
            <span className="text-gray-500">
              {additionalState === "Repo-specific"
                ? "Perform an API review on this PR"
                : "How to deploy a new skill?"}
            </span>
          </>
        ),
      });
    } else if (currentSection === "Copilot") {
      setButtonText({
        bestPractices: (
          <>
            <CodeIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">Get started</span>
            <span className="text-gray-500">
              What kind of questions can I ask?
            </span>
          </>
        ),
        codeKnowledge: (
          <>
            <BookIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">Code knowledge</span>
            <span className="text-gray-500">
              How to contribute to this repo?
            </span>
          </>
        ),
        summarize: (
          <>
            <ChecklistIcon className="mr-2 text-gray-500" />
            <span className="font-medium py-1 mr-2">Explain</span>
            <span className="text-gray-500 ">Explain to me this method</span>
          </>
        ),
      });
    }
  }, [currentSection, additionalState]); // Trigger this effect when currentSection changes

  const buttonClasses =
    " w-auto max-w-full  h-[36px] py-1 px-3 border rounded-full border-gray-300 hover:bg-gray-100 truncate";
  return (
    <div className="starter-screen flex flex-col flex-grow">
      <button className="flex items-center px-2 ml-2 py-2 cursor-pointer text-gray-500 hover:text-gray-900 mr-4">
        <RepoIcon />
        {additionalState === "Repo-specific" ? (
          <span className="ml-2">copilot-api</span>
        ) : (
          <span className="ml-2">Select a repo</span>
        )}
      </button>
      <div className="flex flex-col items-center w-full flex-grow justify-center px-4">
        <Image
          label={currentSection}
          alt={currentSection}
          src={
            currentSection === "Core Engineering"
              ? "/assets/images/core-engineering-icon.png"
              : currentSection === "Backend API"
              ? "/assets/images/backend-api-icon.png"
              : "/assets/images/copilot-icon.png"
          }
          width="32"
          height="32"
          className="mr-1 border-box shadow-inner border shadow-[inset_0_0_0_1px_rgba(0,0,0,1)] rounded-full"
        />
        <div className="text-xl font-semibold py-1">{currentSection}</div>
        <div className="text-center text-gray-500">
          Copilot is powered by AI, so mistakes are possible. Learn more about
          how Copilot chat works here.{" "}
        </div>
        <div className="flex flex-col items-center w-full gap-2 pt-2 ">
          <button
            className={buttonClasses}
            onClick={() => onSectionChange("bestPractices")}
          >
            {buttonText.bestPractices}
          </button>
          <button
            className={buttonClasses}
            onClick={() => onSectionChange("codeKnowledge")}
          >
            {buttonText.codeKnowledge}
          </button>
          <button
            className={buttonClasses}
            onClick={() => onSectionChange("summarize")}
          >
            {buttonText.summarize}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarterScreen;
