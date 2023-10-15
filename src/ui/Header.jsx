import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/joy/Stack";

function Header({children}) {
	return (
		<Box
			sx={{
				flexGrow: 1,
				mb: 1,
				borderColor: "primary.main",
				bgcolor: "background.paper",
				px: 2,
				py: 2,
			}}
		>
			<Stack
				direction="row"
				justifyContent="flex-start"
				alignItems="center"
				spacing={3}
			>
				{children}
			</Stack>
		</Box>
	);
}

export default Header;
