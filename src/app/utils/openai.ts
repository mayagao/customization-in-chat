// utils/openai.js

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
          title: "Interpret the intention",
          description: [
            "Explain the process and components involved in offline evaluation to provide a comprehensive understanding for model assessment.",
          ],
        },
        {
          title: "Apply custom instructions",
          description: ["Core Engineering"],
        },
        {
          title: "Identify relevant sources and methods",
          description: [
            "data-processing/prep_data.py",
            "evaluation-scripts/calculate_metrics.py",
            "result-analysis/parse_results.py",
          ],
        },
        {
          title: "Synthesize information on offline evaluation steps",
          description: [
            "Data preparation: clean and format data",
            "Metric evaluation: apply predefined metrics",
            "Result parsing: structure and summarize output",
          ],
        },
        {
          title: "Validate sources",
          description: [
            "Ensure recent tests and updates on core files",
            "Check compatibility with latest data formats",
          ],
        },
      ],
      output:
        "The offline evaluation process uses a structured approach to assess model performance on historical data.\n\n" +
        'It starts with **data preparation**, where `data-processing/prep_data.py` ensures data is cleaned, normalized, and formatted for evaluation [1](#source1 "data-processing/prep_data.py").\n' +
        'This step removes inconsistencies that could impact results, like missing values [1](#source1 "data-processing/prep_data.py").\n\n' +
        'The next stage is **metric-based evaluation**. In `evaluation-scripts/calculate_metrics.py`, relevant metrics (e.g., accuracy, precision) are applied to determine model effectiveness [2](#source2 "evaluation-scripts/calculate_metrics.py").\n' +
        "Automating these metrics provides objective benchmarks and highlights performance areas needing improvement.\n\n" +
        'Lastly, **result parsing** with `result-analysis/parse_results.py` structures the output into readable formats (JSON or CSV) and generates summaries, making it easier to interpret [3](#source3 "result-analysis/parse_results.py").\n\n' +
        "By reviewing these results, teams gain insights into model reliability, pinpoint strengths, and adjust as necessary before deployment.\n\n" +
        "This offline cycle supports iterative model improvements, enabling teams to refine models confidently.",
      sources: [
        {
          type: "code file",
          name: "prep_data.py",
          path: "data-processing/prep_data.py",
          references: 3,
        },
        {
          type: "code file",
          name: "calculate_metrics.py",
          path: "evaluation-scripts/calculate_metrics.py",
          references: 1,
        },
        {
          type: "code file",
          name: "parse_results.py",
          path: "result-analysis/parse_results.py",
          references: 1,
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
      }, 50); // Adjust speed as needed
    }, response.reasoning_process.length * stepDelay);

    // Step 3: Display sources immediately after output is complete
    setTimeout(() => {
      setSources(response.sources);
    }, response.reasoning_process.length * stepDelay + response.output.split(" ").length * 50 + 10);
  } catch (error) {
    console.error("Network error:", error);
  }
}
