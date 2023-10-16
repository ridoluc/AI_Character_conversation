import React, { useState, useRef, useEffect } from "react";
import {
	Sheet,
	Button,
	Textarea,
	Stack,
} from "@mui/joy";

import { initialiseConversation } from "../chat_engine/NPC_Conversation";

function ConversationContext({character, prompt, setPrompt}) {

	useEffect(() => {
		const str = initialiseConversation(character);
		setPrompt(str);
	},[character])

	const onClickHandle = () => {

	}


	return (
		<Sheet>
			<Textarea
           minRows={10}
           maxRows={16}
				sx={{ fontSize: "sm"}}
				value={prompt}
				// onChange={(e) => setPrompt(e.target.value)}
			></Textarea>
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				spacing={2}
				sx={{ mt: 1 }}
			>

				<Button size="sm" color="primary" onClick={onClickHandle}>
					Start Conversation
				</Button>
			</Stack>
		</Sheet>
	);
}

export default ConversationContext