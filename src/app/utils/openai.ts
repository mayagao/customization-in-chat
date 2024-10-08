// utils/openai.js
export async function fetchOpenAIResponse(prompt, setResponse) {
  setResponse("Loading...");

  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      setResponse("Error fetching response");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    // Clear the initial response text
    setResponse("");

    while (!done) {
      const { value, done: readDone } = await reader.read();
      done = readDone;

      if (value) {
        const chunk = decoder.decode(value);
        setResponse((prev) => prev + chunk); // Append each chunk to the response
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    setResponse("Error fetching response. Please try again.");
  }
}
