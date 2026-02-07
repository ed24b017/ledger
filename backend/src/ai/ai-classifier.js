import axios from "axios";
import prompt_basic from "../prompts/prompts";

// This is the core function that talks to the AI
async function classifyEmail(email, studentProfile) {
	// Step 1: Build the prompt (the question we ask the AI)
	const prompt = prompt_basic;
	// Step 2: Send the prompt to Ollama
	try {
		const response = await axios.post(
			"http://localhost:11434/api/generate",
			{
				model: "llama3.2:3b",
				prompt: prompt,
				stream: false,
				options: {
					temperature: 0.3, // Lower = more consistent/deterministic
					num_predict: 200, // Max tokens to generate
				},
			},
		);

		// Step 3: Parse the AI's response
		const aiResponse = response.data.response;

		// Try to extract JSON from the response
		const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			const classification = JSON.parse(jsonMatch[0]);
			return classification;
		} else {
			throw new Error("AI did not return valid JSON");
		}
	} catch (error) {
		console.error("Classification error:", error);

		// Fallback classification if AI fails
		return {
			category: "Unknown",
			priority: "Medium",
			reason: "Classification failed",
			confidence: 0.0,
		};
	}
}

// Export for use in your Express routes
export { classifyEmail };
