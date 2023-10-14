import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';

function NewCharacter() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');

  const handleGenerate = () => {
    // Generate your name and background values here
    // For example:
    const generatedName = 'Generated Name';
    const generatedBackground = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    // Update the state with the generated values
    setName(generatedName);
    setBackground(generatedBackground);
  };

  const handleSave = () => {
    // Handle saving the current name and background values

    console.log('Name:', name);
  };

  
  return (
    <React.Fragment>

      <Button variant="outlined" startDecorator={<AddIcon />} onClick={() => setOpen(true)}>
        New Character
      </Button>



      <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >

        <Sheet
          variant="outlined"
          sx={{
            minWidth: 500,
            borderRadius: 'md',
            p: 3,
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Create new character
          </Typography>

          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input />
              <FormLabel>Location</FormLabel>
              <Input />
            </FormControl>
            <Button type="button" onClick={handleGenerate}>Generate</Button>

            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)}  />
            </FormControl>
            <FormControl>
              <FormLabel>Background</FormLabel>
              <Textarea value={background} onChange={(e) => setBackground(e.target.value)} minRows={2} size="sm"/>
            </FormControl>
            <Button type="submit" onClick={handleSave}>Save</Button>
          </Stack>
        </Sheet>
      </Modal>


    </React.Fragment>

  )
}

export default NewCharacter