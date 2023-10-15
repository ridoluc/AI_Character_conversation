import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import {
	Textarea,
	Typography,
	Sheet,
	Stack,
	ModalClose,
	Modal,
	Input,
	FormLabel,
	FormControl,
	Button,
	Autocomplete,
	FormHelperText,
} from "@mui/joy";

import { default_game_data } from "../../data/defaults";

function NewCharacter({ characterData, onDataChange }) {
	// Hook for the modal state (open,closed)
	const [open, setOpen] = React.useState(false);

	const DEFAULTS = default_game_data;

	const roles_options = DEFAULTS.NPC_job;
	const social_options = DEFAULTS.NPC_social_class;

	// Data
	const [role, setRole] = React.useState("");
	const [social, setSocial] = React.useState("");
	const [location, setLocation] = React.useState("");
	const [name, setName] = React.useState("");
	const [background, setBackground] = React.useState("");

	const handleGenerate = () => {
		// Generate your name and background values here
		// For example:
		const generatedName = "Generated Name";
		const generatedBackground = `xx Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

		// Update the state with the generated values
		setName(generatedName);
		setBackground(generatedBackground);
	};

	const handleSave = () => {
		// Handle saving the current name and background values

		onDataChange({
			...characterData,
			name: name,
			role: role,
			social_class: social,
			location: location,
			background: background,
		});

		console.log("Name:", name);

		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button
				variant="outlined"
				startDecorator={<AddIcon />}
				onClick={() => setOpen(true)}
			>
				New Character
			</Button>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Sheet
					variant="outlined"
					sx={{
						minWidth: 500,
						borderRadius: "md",
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
							<Autocomplete
								value={role}
								freeSolo
								options={roles_options}
								getOptionLabel={(option) => option.toString()} // Convert the option to a string
								onChange={(e, newValue) => setRole(newValue)}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Social Class</FormLabel>
							<Autocomplete
								value={social}
								freeSolo
								options={social_options}
								getOptionLabel={(option) => option.toString()} // Convert the option to a string
								onChange={(e, newValue) => setSocial(newValue)}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Location</FormLabel>
							<Input
								value={location}
								onChange={(e) => setLocation(e.target.value)}
							/>
							<FormHelperText level="body-xs">
								Describe the loacation where the NPC is found
							</FormHelperText>
						</FormControl>
						<Button type="button" onClick={handleGenerate}>
							Generate
						</Button>

						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Background</FormLabel>
							<Textarea
								value={background}
								onChange={(e) => setBackground(e.target.value)}
								minRows={2}
								maxRows={5}
								size="sm"
							/>
						</FormControl>
						<Button type="submit" onClick={handleSave}>
							Save
						</Button>
					</Stack>
				</Sheet>
			</Modal>
		</React.Fragment>
	);
}

export default NewCharacter;
