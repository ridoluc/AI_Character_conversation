import { React, useEffect, useState } from "react";
import "./App.css";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";
import Header from "./Header.jsx";
import CharacterView from "./CharacterView.jsx";
import CustomSheet from "./CustomSheet.jsx";
import ChatContainer from "./ChatContainer.jsx";
import ConversationContext from "./ConversationSetup";
import SettingsPane from "./SettingsPane.jsx";
import NewCharacter from "./NewCharacter.jsx";

import { LLM_Model } from "../chat_engine/LLM_Model";
import { Character } from "../chat_engine/Character";
import {
	NPCConversation,
	initialiseConversation,
} from "../chat_engine/NPC_Conversation";

export default function App() {
	const [AImodel, setAImodel] = useState(new LLM_Model());

	const [character, setCharater] = useState(
		new Character(0, AImodel, {
			name: "Eadric Hartwell",
			role: "Farmer",
			social_class: "Commoner",
			background:
				"Eadric Hartwell, a humble farmer from the commoner class, toiled in the fertile lands for decades, reaping the bounty of his labor. With wisdom that comes from age, Eadric faces new adventures, leaving his peaceful life behind, driven by a mysterious call to protect his land.",
		})
	);
	const [conversation, setConversation] = useState(
		new NPCConversation(AImodel, character)
	);
	const [prompt, setPrompt] = useState(initialiseConversation(character));
	const [messages, setMessages] = useState([]);
	const [conversation_started, setConversation_started] = useState(false);

	useEffect(() => {
		// Update conversation whenever AImodel changes
		setConversation((prevConversation)=>{
			return({
				...prevConversation,
				LLM_Model:AImodel
			})
		});
		setCharater((prevCharacter) =>{
			return({
				...prevCharacter,
				ai_model:AImodel
			})
		})

	 }, [AImodel]);


	const handleStartConversation = async () => {
		setConversation_started(true);
		setMessages((prevMessages) => [
			...prevMessages,
			{ content: prompt, sender: "System" },
		]);

		const initial_response = await conversation.startConversation(prompt, AImodel);

		setMessages((prevMessages) => [
			...prevMessages,
			{ content: initial_response, sender: "Character" },
		]);
	};

	const handleCloseConversation = () => {
		setMessages([]);
		conversation.messagesStream = [];
		setConversation_started(false);
	};
	// useEffec t(() => {

	// Update the conversation and character in one batch
	//   setConversation((prevConversation) => ({
	//     ...prevConversation,
	//     character: character,
	//   }));

	//       // Initialize the conversation and get the prompt
	//       const str = conversation.initialiseConversation();
	//       console.log(str)
	//   // Update the prompt after character and conversation are updated
	//   setPrompt(str);
	// }, [character]);

	return (
		<CssVarsProvider>
			<Header>
				<SettingsPane model={AImodel} onModelChange={setAImodel} />
				<NewCharacter
					characterData={character}
					onDataChange={setCharater}
					llm_model={AImodel}
				/>
			</Header>
			<Grid
				container
				spacing={2}
				justifyContent="center"
				alignItems="flex-start"
			>
				<Grid xs={12} md={4} lg={3}>
					<CustomSheet title="Character">
						<CharacterView
							characterData={character}
							setCharacterData={setCharater}
						/>
					</CustomSheet>
				</Grid>
				<Grid xs={8} md={4}>
					<CustomSheet title="Initialisation">
						<ConversationContext
							character={character}
							prompt={prompt}
							setPrompt={setPrompt}
							onClickHandle={handleStartConversation}
							conversation_started={conversation_started}
						/>
					</CustomSheet>
				</Grid>
				<Grid xs={8} md={4} lg={5}>
					<CustomSheet title="conversation">
						<ChatContainer
							messages={messages}
							setMessages={setMessages}
							onCloseClick={handleCloseConversation}
							conversation={conversation}
							llm_model={AImodel}
						/>
					</CustomSheet>
				</Grid>
			</Grid>
		</CssVarsProvider>
	);
}
