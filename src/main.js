import { LLM_Model } from "./chat_engine/LLM_Model.js";
import { Character } from "./chat_engine/Character.js";
import { NPCConversation } from "./chat_engine/NPC_Conversation.js";

async function main() {
	const ai_mdl = new LLM_Model(LLM_Model.Models.dummy, {apiKey:"test"});

	const character1 = new Character(1, ai_mdl, {
		role: "adventurer",
		inventory: { gold: 189 },
	});

	await character1.generateBackground();
   
   const conv1 = new NPCConversation(ai_mdl, character1);

   
	console.log(conv1.initialiseConversation());
}

main();
