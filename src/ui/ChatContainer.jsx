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

function ChatContainer({ messages, setMessages, onCloseClick, conversation }) {
	// const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const chatContainerRef = useRef();

	const handleSendMessage = async () => {
		if (newMessage.trim() !== "") {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			const response = await conversation.chat(newMessage);

			setMessages((prevMessages) => [...prevMessages, response]);

			setNewMessage("");
		}
	};

	// Automatically scroll to the bottom when new messages are added
	useEffect(() => {
		chatContainerRef.current.scrollTop =
			chatContainerRef.current.scrollHeight;
	}, [messages]);

	return (
		<Sheet>
			<Sheet
				ref={chatContainerRef}
				sx={{ mb: 2, height: 300, borderRadius: 4, overflow: "auto" }}
				variant="soft"
			>
				<List>
					{messages.map((message, index) => (
						<ListItem
							variant="soft"
							key={index}
							sx={{
								mb: 1,
								mx: 1,
								borderRadius: 3,
								bgcolor: "primary.100",
							}}
						>
							<ListItemContent>
								<Typography level="body-sm">
									{message}
								</Typography>
							</ListItemContent>
						</ListItem>
					))}
				</List>
			</Sheet>
			<Textarea
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				variant="outlined"
				required
				size="sm"
				sx={{
					"--Textarea-focusedThickness": "1px",
				}}
				endDecorator={
					<Button
						color="primary"
						variant="outlined"
            size="sm"
						onClick={handleSendMessage}
						sx={{ ml: "auto" }}
						endDecorator={<SendIcon />}
					>
						Send
					</Button>
				}
			/>
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				spacing={2}
				sx={{ mt: 1 }}
			>
				<Button size="sm" color="warning" variant="outlined">
					Action
				</Button>
				<Button size="sm" color="danger" onClick={onCloseClick}>
					Close
				</Button>
			</Stack>
		</Sheet>
	);
}

export default ChatContainer;
