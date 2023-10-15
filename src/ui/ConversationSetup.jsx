import React, { useState, useRef, useEffect } from "react";
import {
	Sheet,
	List,
	ListItem,
	ListItemContent,
	Input,
	Button,
	Textarea,
	Stack,
	Typography,
} from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";

function ConversationContext() {
	const [prompt, setPrompt] = useState("");

	return (
		<Sheet>
			<Textarea
           minRows={10}
           maxRows={16}
				sx={{ fontSize: "xs"}}
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			></Textarea>
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				spacing={2}
				sx={{ mt: 1 }}
			>

				<Button size="sm" color="primary">
					Start Conversation
				</Button>
			</Stack>
		</Sheet>
	);
}

export default ConversationContext