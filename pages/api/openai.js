import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Make a request to OpenAI API without streaming
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: false, // Disable streaming
    });

    // Extract the content from the response
    const messageContent = response.choices[0].message.content;
    // Send the response back to the client
    res.status(200).json(messageContent);
  } catch (error) {
    // Log and return error response if OpenAI request fails
    console.error("Error with OpenAI API request:", error);
    res.status(500).json({
      error: "Failed to fetch response from OpenAI API",
      details: error.message,
    });
  }

  // try {
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: prompt }],
  //     stream: true, // Disable streaming
  //   });

  //   // Set headers for Server-Sent Events (SSE)
  //   res.setHeader("Content-Type", "text/event-stream");
  //   res.setHeader("Cache-Control", "no-cache");
  //   res.setHeader("Connection", "keep-alive");

  //   // Iterate over the streaming response
  //   for await (const chunk of response) {
  //     if (chunk.choices && chunk.choices[0].delta.content) {
  //       const content = chunk.choices[0].delta.content;
  //       res.write(`${content}\n`);
  //       // Stream each chunk as an SSE message
  //     }
  //   }

  //   res.write("[DONE]\n\n"); // Indicate the end of the stream
  //   res.end(); // Close the response
  // } catch (error) {
  //   console.error("Error with OpenAI API request:", error);
  //   res.status(500).json({ error: "Failed to fetch response from OpenAI API" });
  // }
}
