import { React, useState } from "react";
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

export default function App() {
	const [AImodel, setAImodel] = useState(new LLM_Model());
	const [character, setCharater] = useState(new Character(0, AImodel));

	return (
		<CssVarsProvider>
			<Header>
				<SettingsPane model={AImodel} onModelChange={setAImodel} />
				<NewCharacter
					characterData={character}
					onDataChange={setCharater}
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
						<ConversationContext />
					</CustomSheet>
				</Grid>
				<Grid xs={8} md={4} lg={5}>
					<CustomSheet title="conversation">
						<ChatContainer />
					</CustomSheet>
				</Grid>
			</Grid>
		</CssVarsProvider>
	);
}
