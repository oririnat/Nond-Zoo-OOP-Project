import React from 'react'
import { Container, Box } from '@mui/material'
import NavBar from './NavBar'
import Logo from '../components/Logo'
import Animals from '../components/animals/Animals'

const Home = ({ LoggedUser, setAuth }) => {

  return (
    <>
      <NavBar LoggedUser={LoggedUser} setAuth={setAuth} />

      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <UserDetails/> */}
        <Box sx={{ mb: 10, mt: 1 }}>
          <Logo />
        </Box>
        <Animals/>
      </Container>
    </>
  )
}

export default Home
