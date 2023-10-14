import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';


function CustomSheet({children, title}){
  
return (
  <Sheet variant="plain" sx={{
    mx: 'auto', // margin left & right
    py: 0, // padding top & bottom
    px: 2, // padding left & right
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    borderRadius: 'sm',
  }}>
    <Typography level="body-sm"  sx={{ textTransform: 'uppercase', color: 'neutral.400' }}>{title}</Typography>
    {children}
  
  </Sheet>
)
}


export default CustomSheet