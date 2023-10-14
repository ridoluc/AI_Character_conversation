import OpenAI from "openai";

export class LLM_Model {
	// Define possible models
	static Models = { dummy: 0, open_ai: 1 };

	/**
	 * Initialize the LLM_Model instance.
	 * @param {string} model - The model name (e.g., 'dummy' or 'open_ai').
	 * @param {Object} settings - Model-specific settings and API key.
	 */
	constructor(model, settings) {
		this.modelName = model;
		this.settings = settings;

		if (!Object.values(LLM_Model.Models).includes(this.modelName)) {
			throw new Error(`Invalid model name: ${this.modelName}`);
		}
	}

	/**
	 * Generate a response based on the selected model.
	 * @param {Array} messages - An array of messages for the conversation.
	 * @returns {Promise<string>} - A Promise that resolves with the generated response.
	 */
	async generateResponse(messages) {
		switch (this.modelName) {
			case LLM_Model.Models.dummy:
				return dummyModel("");
			case LLM_Model.Models.open_ai:
				return openAiModel(messages, this.settings);
			default:
				break;
		}
	}

	/**
	 * Utility for combining role and content in a message for the ai model
	 * @param {string} content message sent to the ai model
	 * @param {string} role role of the ai like 'system', 'user', 'character'
	 * @returns object combining the role and the content
	 */
	static createRoleContentPair(content, role) {
		return {
			role: role,
			content: content,
		};
	}
}

/**
 * Generate a response using the OpenAI model.
 * @param {Array} messages - An array of messages for the conversation.
 * @param {Object} settings - Model-specific settings and API key.
 * @returns {Promise<string>} - A Promise that resolves with the generated response.
 */
async function openAiModel(messages, settings) {
	const openai = new OpenAI({
		apiKey: settings.apiKey,
	});

	try {
		const completion = await openai.chat.completions.create({
			messages: messages,
			model: settings.model || "gpt-3.5-turbo",
		});

		return completion.choices[0].message;
	} catch (error) {
		throw new Error(`API Error ${error.message}`);
	}
}

/**
 * Generate a response using the dummy model.
 * @param {string} message - Input message (not used in this example).
 * @returns {Promise<string>} - A Promise that resolves with a default message.
 */
async function dummyModel(message) {
	
	return {
		role: "assistant",
		content: `TEST MESSAGE FROM DUMMY MODEL`,
	};
}

// {
//   background:
//     "Born into a family of traveling performers, this vagabond grew up learning various skills and arts while wandering the world. They've seen both beauty and danger, making them resourceful and adaptable.",
//   name: "Ariana Swiftfoot",
// }
