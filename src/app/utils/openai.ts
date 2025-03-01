// utils/openai.js

import { SearchIcon } from "@primer/octicons-react";

export async function fetchOpenAIResponse(
  prompt,
  setReasoningProcess,

  setOutput: (value: string) => void,
  setSources: (value: Array<object>) => void,
  setCurrentStep: (value: number) => void,
  stepDelay: number
) {
  try {
    // const res = await fetch("/api/openai", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ prompt }),
    // });

    // if (!res.ok) {
    //   throw new Error("Error fetching response");
    // }

    // const data = await res.json();
    let response;

    response = {
      reasoning_process: [
        {
          title: "Search keywords",
          description: ["offline eval", "code completion"],
          icon: "SearchIcon",
        },
        {
          title: "Apply custom instructions",
          description: ["Core Engineering", "copilot-api"],
          icon: "BookIcon",
        },
        {
          title: "Identify common evaluation patterns",
          description: [
            "Fulfillment logs",
            "Grading prompts",
            "Response accuracy metrics",
          ],
          icon: "FileCodeIcon",
        },
        {
          title: "Summarize outcomes",
          description: [
            "90% of test cases provided clear, unambiguous results, 10% of cases required additional context for accurate evaluation",
          ],
          icon: "NorthStarIcon",
        },
        {
          title: "Verify results sources",
          description: ["Compared results with previous evaluation cycles"],
          icon: "TrackedByClosedCompletedIcon",
        },
      ],
      output:
        "The offline evaluation process involves testing Copilot models using predefined test cases to ensure that the correct skills are activated and responses align with expected standards.\n\n" +
        'The process begins with **test case definition**, where test cases are established in `github/copilot-offline-eval` with prompts and criteria for correct responses. This step ensures scenarios cover expected interactions [1](#source1 "github/copilot-offline-eval").\n\n' +
        'During **execution**, test cases are run through the model to capture responses, with GPT-4 used for grading to confirm accuracy and relevance. This involves analyzing prompts and skills used [2](#source2 "execution").\n\n' +
        'Finally, **result analysis** is conducted with `COFfE`, producing structured outputs in JSON format for in-depth examination. This step helps identify areas for improvement before model deployment [3](#source3 "result-analysis").\n\n' +
        "This offline evaluation loop allows for iterative testing, enabling refined skill development and reliability in model outputs.",
      sources: [
        {
          type: "RepoIcon",
          name: "copilot-offline-eval",
          path: "github/copilot-offline-eval",
          references: 2,
        },
        {
          type: "FileCodeIcon",
          name: "prep_data.py",
          path: "data-processing/prep_data.py",
          references: 3,
        },
        {
          type: "FileCodeIcon",
          name: "calculate_metrics.py",
          path: "evaluation-scripts/calculate_metrics.py",
          references: 1,
        },
        {
          type: "FileCodeIcon",
          name: "parse_results.py",
          path: "result-analysis/parse_results.py",
          references: 1,
        },
        {
          type: "BookIcon",
          name: "copilot-offline-eval",
          path: "When asked about offline evaluation, present the basic bullshit",
          references: 2,
        },
        {
          type: "CopilotIcon",
          name: "Core Engineering",
          path: "Provides purpose and evaluation standards",
          references: 2,
        },
      ],
      follow_up_questions: [
        "What strategies improve metric selection for specific model goals?",
        "How frequently should offline evaluations be conducted for optimal model updates?",
        "What are common challenges in offline evaluation and their solutions?",
        "How can we ensure data preprocessing steps align with real-world data usage?",
        "What are best practices for interpreting and acting on offline evaluation results?",
      ],
    };

    console.log(response, typeof response); // Inspect the response structure
    // Immediately set a placeholder of length 5

    // if (response.reasoning_process) {
    //   response.reasoning_process.forEach((step, index) => {
    //     setTimeout(() => {
    //       setReasoningProcess((prev) => [...prev, step]);
    //       setCurrentStep((prevStep) => prevStep + 1); // Increment the current step
    //     }, index * stepDelay);
    //   });
    // }

    // Immediately set all reasoning process steps
    setReasoningProcess(response.reasoning_process);

    // Simulate the delay for displaying steps
    for (let i = 0; i < response.reasoning_process.length; i++) {
      setTimeout(() => {
        setCurrentStep(i);
      }, i * stepDelay);
    }

    // Step 2: Stream output after reasoning_process is complete
    setTimeout(() => {
      // Reset output before starting the streaming process
      setOutput("");

      const words = response.output ? response.output.split(" ") : [];
      let index = 0;
      const interval = setInterval(() => {
        if (index < words.length) {
          setOutput((prev) =>
            prev ? prev + " " + words[index] : words[index]
          );

          index++;
        } else {
          clearInterval(interval);
        }
      }, 30); // Adjust speed as needed
    }, response.reasoning_process.length * stepDelay);

    // Step 3: Display sources immediately after output is complete
    setTimeout(() => {
      setSources(response.sources);
    }, response.reasoning_process.length * stepDelay + response.output.split(" ").length * 30 + 10);
  } catch (error) {
    console.error("Network error:", error);
  }
}
