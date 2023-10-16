import { LLM_Model } from "./LLM_Model.js";

export class Character {
	constructor(id, LLM_model, data = {}) {
		this.id = id;
		this.ai_model = LLM_model;
		this.name = data.name || null;
		this.role = data.role || null;
		this.social_class = data.social_class || null;
		this.age = data.age || 25;
		this.location = "";
		this.background = data.background || null;
		this.inventory = {
			gold: 0,
			items: null,
		};
		this.statistics = data.statistics || null;

		/**
		 * Generate the character background
		 */
		this.generateBackground = async () => {
			const prompt = `Write the background story and name for an RPG character using the following data, in less than 150 tokens: 
		\nrole: ${this.role}, \nSocial Extraction: ${this.social_class}, \nAge:${this.age}\nReturn a JSON object containing "background" and "name" properties`;

			const messages = [];
			messages.push(LLM_Model.createRoleContentPair("user", prompt));

			try {
				const response = await this.ai_model.generateResponse(messages);

				const parsed_response = this.safeParseBackground(
					response.content
				);

				this.background = parsed_response.background;
				this.name = parsed_response.name;

				return this;
			} catch (error) {
				console.error("Character generation error:", error);
			}
		};

		this.safeParseBackground = (str) => {
			try {
				return JSON.parse(response.content);
			} catch (error) {
				// Initialize variables to store the extracted values
				let extractedName = "-";
				let extractedBackground = "-";

				// Use regular expressions to extract the values associated with "name" and "background"
				const nameMatch = str.match(/"name"\s*:\s*"([^"]+)"/);
				const backgroundMatch = str.match(
					/"background"\s*:\s*"([^"]+)"/
				);

				// Check if matches were found and extract the values
				if (nameMatch) {
					extractedName = nameMatch[1];
				}

				if (backgroundMatch) {
					extractedBackground = backgroundMatch[1];
				}

				// Return the extracted values
				return { name: extractedName, background: extractedBackground };
			}
		};
	}
}
