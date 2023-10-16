import React, { useState } from "react";

import {
	FormLabel,
	FormControl,
	Autocomplete,
	Divider,
	Input,
	Typography,
	Chip,
	Box,
	Slider,
	Stack,
	Button
} from "@mui/joy";

import { default_game_data } from "../../data/defaults";

function CharacterView({ characterData, setCharacterData }) {
	const DEFAULTS = default_game_data;
	const items_options = DEFAULTS.Items;
	const character_qualities = DEFAULTS.NPC_qualities;
	const [qualities, setQualities] = useState(
		character_qualities.reduce((acc, item) => {
			const key = Object.keys(item)[0];
			acc[key] = 0;
			return acc;
		}, {})
	);

	const [items, setItems] = useState([]);
	const [gold, setGold] = useState(0);

	const handleQualityChange = (qualityName, newValue) => {

		const newQualititesObj ={
			...qualities,
			[qualityName]: newValue,
		 }

		setQualities(newQualititesObj);

		const characterStats = [];

		character_qualities.forEach((quality) => {
			const qualityName = Object.keys(quality)[0]; // Get the quality name
			const qualityValue = newQualititesObj[qualityName]; // Get the value from opt
		 
			if (qualityValue === 1) {
				characterStats.push(quality[qualityName].adjective)
			} else if (qualityValue === -1) {
				characterStats.push(quality[qualityName].antonym)
			} 
		 });

		 setCharacterData({
			...characterData,
			statistics:characterStats
		 })
	 };

	return (
		<>
			<div>
				<Typography level="h4">{characterData.name}</Typography>
				<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
					<Chip color="primary" size="sm" variant="soft">
						{characterData.role}
					</Chip>
					<Chip color="primary" size="sm" variant="soft">
						{characterData.social_class}
					</Chip>
				</Box>
				<Typography level="body-sm">
					{characterData.background}
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
					value={gold}
					slotProps={{
						input: {
							min: 0,
							max: 999,
							step: 1,
						},
					}}
					sx={{ minWidth: "100px" }}
					onChange={(e) => {
						const rawVal = e.target.value ? e.target.value : "0";
						const newVal = Number.parseInt(rawVal)
						setGold(newVal);
						console.log(newVal);
						setCharacterData({
							...characterData,
							inventory:{
								...characterData.inventory,
								gold:newVal,
							},
						})
					}}
				/>
			</FormControl>
			<FormControl orientation="horizontal" size="sm">
				<FormLabel sx={{ mr: "auto", pr: 3 }}>Items</FormLabel>
				<Autocomplete
					multiple
					placeholder="Select Items"
					options={items_options}
					value={items}
					onChange={(e, newItems) => {
						setItems(newItems);
						setCharacterData({
							...characterData,
							inventory:{
								...characterData.inventory,
								items:newItems,
							},
						})
					}}
					sx={{maxWidth:"60%"}}
				/>
			</FormControl>

			<Divider
				sx={{ "--Divider-childPosition": "50%", color: "neutral.400" }}
			>
				{" "}
				Stats{" "}
			</Divider>

			{Object.entries(qualities).map(([qualityName, qualityValue]) => (
				<Box
					sx={{ display: "flex", gap: 1, alignItems: "center" }}
					key={qualityName}
				>
					<Box sx={{ flexGrow: 1 }}>
						<Typography level="title-sm">{qualityName}</Typography>
					</Box>
					<Box sx={{ width:"60%"}}>
						<Slider
							value={qualityValue}
							onChange={(e, newValue) => handleQualityChange(qualityName, newValue)}

							step={1}
							min={-1}
							max={1}
							marks
							track={false}
							sx={{
								"--Slider-trackSize": "9px",
								"--Slider-markSize": "3px",
								"--Slider-thumbSize": "17px",
								"--Slider-thumbWidth": "12px",
								"--Slider-valueLabelArrowSize": "12px",
								
								py:0
							}}
						/>
					</Box>
				</Box>
			))}
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				spacing={2}
				sx={{ mt: 1 }}
			>

				<Button size="sm" color="primary">
					Save
				</Button>
			</Stack>
		</>
	);
}

export default CharacterView;
