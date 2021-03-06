import * as React from 'react'
import { AppBar, Box, Toolbar, Button } from '@mui/material'

export default function NavBar({ LoggedUser, setAuth }) {

  const logout = () => { 
    setAuth(false);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <p> Welcome {LoggedUser}  </p>
          <Button
            size="large"
            style={{ display: 'block', marginLeft: '10px' }}
            variant="contained"
            onClick={logout}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
