import { createContext, useState, useContext } from 'react';

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
    // Add state for toggle options
    const [currentSection, setCurrentSection] = useState('Core Engineering');
    const [additionalState, setAdditionalState] = useState('default');

    return (
        <AppStateContext.Provider value={{ currentSection, setCurrentSection, additionalState, setAdditionalState }}>
            {children}
        </AppStateContext.Provider>
    );
};
