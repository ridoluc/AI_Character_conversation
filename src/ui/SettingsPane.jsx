import React, { useState } from 'react';
import Drawer from '@mui/joy/Drawer';
import IconButton from '@mui/joy/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Stack from '@mui/joy/Stack';
import { LLM_Model } from '../chat_engine/LLM_Model';

function SettingsPane({model, onModelChange}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };

  const onMdlSelectionChange = (d) => {
    let mdl_name;
    let settings=model.settings;

    switch (d) {
      case "dummy":
        mdl_name =0;
        settings.model = "dummy";

        break;
      case "gpt3":
        mdl_name =1;
        settings.model = "gpt-3.5-turbo";
        break;
      case "gpt4":
        mdl_name =1;
        settings.model = "gpt-4";
        break;
      default:
        mdl_name =0;
        break;
    }
    // onModelChange((prevModel) => ({...prevModel, modelName: mdl_name, settings:settings}));
    onModelChange(new LLM_Model(model=mdl_name, settings=settings));
    console.log(model);
  }

  const onApiChange = (d) => {
    onModelChange((prevModel) => ({...prevModel, settings:{...prevModel.settings, apiKey:d}}));

  }


  return (
    <div>
      <IconButton aria-label="settings" variant="outlined" color="primary" onClick={toggleDrawer(true)}>
        <SettingsIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"


          sx={{px: 3, py: 3}}
          >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
          <Typography level="h4"  >Settings</Typography>

          <FormControl size="sm">
            <FormLabel>Model</FormLabel>
            <RadioGroup defaultValue="dummy" name="radio-buttons-group" onChange={(e) => onMdlSelectionChange(e.target.value)}>
              <Radio value="dummy" label="Dummy" />
              <Radio value="gpt3" label="GPT 3.5" />
              <Radio value="gpt4" label="GPT 4.0" />
              <Radio value="local" label="Local (not used)" />
            </RadioGroup>
          </FormControl>

          
          <FormControl
            size="sm"
          >
            <FormLabel sx={{ mr: "auto", pr: 3 }}>API Key</FormLabel>
            <Input  placeholder="Write the API Key here" onChange={(e) => onApiChange(e.target.value)}/>
          </FormControl>
            </Stack>
        </Box>
      </Drawer>
    </div>
  )

}

export default SettingsPane;