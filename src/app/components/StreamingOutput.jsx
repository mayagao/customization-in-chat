import React, { useEffect, useRef, useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

const StreamingOutput = () => {
  const { setResponse } = useContext(ChatContext);
  const outputRef = useRef();

  useEffect(() => {
    // Set up the EventSource to listen to the streaming endpoint
    const eventSource = new EventSource("/api/openai");

    eventSource.onmessage = (event) => {
      const htmlChunk = event.data;

      // Append the HTML chunk to the output div
      if (outputRef.current) {
        outputRef.current.insertAdjacentHTML("beforeend", htmlChunk);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error receiving SSE:", error);
      eventSource.close();
    };

    // Clean up the EventSource connection when the component unmounts
    return () => {
      eventSource.close();
      setResponse(""); // Clear response when component unmounts
    };
  }, [setResponse]);

  return <div ref={outputRef} className="streaming-output"></div>;
};

export default StreamingOutput;
