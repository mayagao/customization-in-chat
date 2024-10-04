"use client";

import { useEffect, useState } from "react";

import ToggleButton from "./components/ToggleButton";
import ChatWindow from "./components/ChatWindow"; // Updated import
import { useAppState } from "./contexts/AppStateContext";

export default function Home() {
  const {
    currentSection,
    setCurrentSection,
    additionalState,
    setAdditionalState,
  } = useAppState();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure that the component only mounts on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render until mounted on the client
  }

  const handleToggleClick = (section: string) => {
    setCurrentSection(section);
  };

  const handleAdditionalToggleClick = (newState: string) => {
    if (additionalState === newState) {
      setAdditionalState("global"); // Toggles it off
    } else {
      setAdditionalState(newState); // Toggles it on
    }
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 m-auto py-3 mt-4 justify-center">
        <ToggleButton
          label="Core Engineering"
          imageSrc={"/assets/images/core-engineering-icon.png"}
          isActive={currentSection === "Core Engineering"}
          onClick={() => handleToggleClick("Core Engineering")}
        />
        <ToggleButton
          label="Backend API"
          imageSrc={"/assets/images/backend-api-icon.png"}
          isActive={currentSection === "Backend API"}
          onClick={() => handleToggleClick("Backend API")}
        />
        <ToggleButton
          label="Copilot"
          imageSrc={"/assets/images/copilot-icon.png"}
          isActive={currentSection === "Copilot"}
          onClick={() => handleToggleClick("Copilot")}
        />

        <div className="additional-toggle pl-3 border-l">
          <ToggleButton
            label="Repo-specific"
            imageSrc={undefined}
            isActive={additionalState === "Repo-specific"}
            onClick={() => handleAdditionalToggleClick("Repo-specific")}
          />
        </div>
      </div>

      <ChatWindow
        currentSection={currentSection}
        additionalState={additionalState}
      />
    </div>
  );
}
