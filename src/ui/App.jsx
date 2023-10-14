import './App.css'
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Header from './Header.jsx'
import Character from './Character.jsx'
import CustomSheet from './CustomSheet.jsx'
import ChatContainer from './ChatContainer.jsx'

export default function App() {
  return (
      <CssVarsProvider>
        <Header/>
        <Grid container spacing={2} justifyContent="center"
          alignItems="flex-start">
          <Grid xs={8} md={4}>
            <CustomSheet title="Character">
            <Character/>  
              </CustomSheet>
          </Grid>
          <Grid xs={8} md={4}>
            <CustomSheet title="Initialisation">
              to do
              </CustomSheet>
          </Grid>
          <Grid xs={8} md={4}>
            <CustomSheet title="conversation">
              <ChatContainer/>
              </CustomSheet>
          </Grid>
          </Grid>
        </CssVarsProvider>  
  )
}
