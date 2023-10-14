import { LLM_Model } from "./LLM_Model.js";

export class Character {
	constructor(id, LLM_model, data) {
		this.id = id;
		this.ai_model = LLM_model;
		this.name = data.name || null;
		this.role = data.role || null;
		this.background = data.background || null;
		this.inventory = {
			gold: data.inventory.gold || 0,
			items: data.inventory.items || null,
		};
		this.statistics = data.statistics || null;
	}

	/**
	 * Generate the character background
	 */
	async generateBackground() {
		const prompt = `Write the background and name for an RPG character with role: ${this.role} in less than 150 tokens. Return a JSON object containing "background" and "name" properties`;

		const messages = [];
		messages.push(LLM_Model.createRoleContentPair("user", prompt));

		try {
			const response = await this.ai_model.generateResponse(messages);

			const parsed_response = this.#safeParseBackground(response.content);

			this.background = parsed_response.background;
			this.name = parsed_response.name;
		} catch (error) {
			console.error("Character generation error:", error);
		}
	}

	#safeParseBackground(str) {
		try {
			return JSON.parse(response.content);
		} catch (error) {
			// Initialize variables to store the extracted values
			let name = "";
			let background = "";

			// Use regular expressions to extract the values associated with "name" and "background"
			const nameMatch = str.match(/"name"\s*:\s*"([^"]+)"/);
			const backgroundMatch = str.match(/"background"\s*:\s*"([^"]+)"/);

			// Check if matches were found and extract the values
			if (nameMatch) {
				name = nameMatch[1];
			}

			if (backgroundMatch) {
				background = backgroundMatch[1];
			}

			// Return the extracted values
			return { name, background };
		}
	}
}
