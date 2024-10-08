// contexts/ChatContext.js
import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [response, setResponse] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");

  return (
    <ChatContext.Provider
      value={{ response, setResponse, inputPrompt, setInputPrompt }}
    >
      {children}
    </ChatContext.Provider>
  );
};
