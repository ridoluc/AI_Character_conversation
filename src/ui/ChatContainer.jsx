import React, { useState, useRef, useEffect } from 'react';
import {
  Sheet,
  List,
  ListItem,
  ListItemContent,
  Input,
  Button,
  Textarea,
  Stack,
  Typography
} from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef();

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <Sheet>
      <Sheet ref={chatContainerRef} sx={{mb:2, height:300, borderRadius: 4, overflow: 'auto'}} variant="soft" >
      <List >
        {messages.map((message, index) => (
          <ListItem variant="soft" key={index} sx={{mb:1,mx:1, borderRadius:3, bgcolor: 'primary.100'}} >
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
            variant="plain"
          onClick={handleSendMessage}
            sx={{ ml: 'auto' }}
        >
          <SendIcon/>
        </Button>}
      />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{mt:1}}
      >
      <Button size="sm" color="warning" variant="outlined">Action</Button>      
      <Button size="sm" color="danger">Close</Button>
      </Stack>
    </Sheet>
  );
}

export default ChatContainer;
