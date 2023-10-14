import React, { useState } from 'react';
import {Box,
        Alert,
        IconButton,
        Typography
       }from '@mui/joy';


import ReportIcon from '@mui/icons-material/Report';


function ErrorDisplay({ error }) {
      return (
      <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
          <Alert
            key="Error"
            sx={{ alignItems: 'flex-start' }}
            startDecorator=<ReportIcon />
            variant="soft"
            color='danger'
            endDecorator={
              <IconButton variant="soft" color='danger'>
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            <div>
              <div>Error</div>
              <Typography level="body-sm" color='danger'>
                {error}.
              </Typography>
            </div>
          </Alert>
        ))}
      </Box>
    );
    }
}

export default ErrorDisplay;