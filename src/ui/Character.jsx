import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

function Character() {
	const options = ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6"];

	return (
		<>
			<div>
				<Typography level="h4" sx={{ mb: 1 }}>
					Mr Char Name
					<Typography
						color="primary"
						level="body-sm"
						variant="soft"
						sx={{ ml: 2 }}
					>
						Warrior
					</Typography>
				</Typography>

				<Typography level="body-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incidi lorem ipsum dolor sit amet,
					consectetur adipiscing elit, sed do eiusmod tempor incidid
				</Typography>
			</div>

			<Divider
				sx={{ "--Divider-childPosition": "50%", color: "neutral.400" }}
			>
				{" "}
				Inventory{" "}
			</Divider>

			<FormControl orientation="horizontal" size="sm">
				<FormLabel sx={{ mr: "auto", pr: 3 }}>Gold</FormLabel>
				<Input
					type="number"
					defaultValue={0}
					slotProps={{
						input: {
							min: 0,
							max: 999,
							step: 1,
						},
					}}
					sx={{ minWidth: "100px" }}
				/>
			</FormControl>
			<FormControl orientation="horizontal" size="sm">
				<FormLabel sx={{ mr: "auto", pr: 3 }}>Items</FormLabel>
				<Autocomplete
					multiple
					placeholder="Placeholder"
					options={options}
				/>
			</FormControl>

			<Divider
				sx={{ "--Divider-childPosition": "50%", color: "neutral.400" }}
			>
				{" "}
				Stats{" "}
			</Divider>
			<Typography level="body-sm">To Do</Typography>
		</>
	);
}

export default Character;
