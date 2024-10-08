import { createContext, useState, useContext } from "react";

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  // Add state for toggle options

  const [currentCopilot, setcurrentCopilot] = useState("Core Engineering");
  const [currentRepo, setcurrentRepo] = useState("default");

  return (
    <AppStateContext.Provider
      value={{
        currentCopilot,
        setcurrentCopilot,
        currentRepo,
        setcurrentRepo,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
