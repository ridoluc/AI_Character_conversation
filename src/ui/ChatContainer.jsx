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
	Avatar,
	Box,
} from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";

function ChatContainer({ messages, setMessages, onCloseClick, conversation , llm_model}) {
	const [newMessage, setNewMessage] = useState("");
	const chatContainerRef = useRef();

	const handleSendMessage = async () => {
		if (newMessage.trim() !== "") {
			setMessages((prevMessages) => [
				...prevMessages,
				{ content: newMessage, sender: "Player" },
			]);
			const response = await conversation.chat(newMessage, llm_model);

			setMessages((prevMessages) => [
				...prevMessages,
				{ content: response, sender: "Character" },
			]);

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
				sx={{
					mb: 2,
					p: 2,
					height: 400,
					borderRadius: 4,
					overflow: "auto",
				}}
				variant="soft"
			>
				<Stack spacing={2} justifyContent="flex-end">
					{messages.map((message, index) => {
						const isPlayer =
							message.sender === "Player" ? true : false;
						return (
							<Stack
								key={index}
								direction="row"
								spacing={2}
								flexDirection={isPlayer ? "row-reverse" : "row"}
							>
								{message.sender !== "Player" && (
									<Avatar variant="solid">
										{message.sender === "Player"
											? "PL"
											: message.sender === "Character"
											? "CH"
											: "SY"}
									</Avatar>
								)}
								<Box sx={{ maxWidth: "60%", minWidth: "10%" }}>
									<Stack
										direction="row"
										justifyContent="space-between"
										spacing={2}
										sx={{ mb: 0.25 }}
									>
										<Typography level="body-xs">
											{message.sender}
										</Typography>
									</Stack>
									<Sheet
										variant="solid"
										sx={{
											p: 1.25,
											borderRadius: "lg",
											borderTopRightRadius: isPlayer
												? 0
												: "lg",
											borderTopLeftRadius: isPlayer
												? "lg"
												: 0,
											backgroundColor:
												message.sender === "Player"
													? "primary.200"
													: message.sender ===
													  "Character"
													? "neutral.50"
													: message.sender ===
													  "System"
													? "warning.50"
													: undefined, // Set a default color or handle other cases
										}}
									>
										<Typography level="body-sm">
											{message.content}
										</Typography>
									</Sheet>
								</Box>
							</Stack>
						);
					})}
				</Stack>
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
