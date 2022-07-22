import React, { useState } from 'react'
import { Container, Box } from '@mui/material'
import NavBar from './NavBar'
import Logo from '../components/Logo'
import MyAnimals from '../components/MyAnimals'
import AnimalsControls from '../components/AnimalsControls'

const Home = ({ LoggedUser, setAuth }) => {
  const [myAnimals, setMyAnimals] = useState([])

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
        <Box sx={{ mb: 10, mt: 1 }}>
          <Logo />
        </Box>
        <AnimalsControls setMyAnimals={setMyAnimals} />
        <MyAnimals myAnimals={myAnimals} />
      </Container>
    </>
  )
}

export default Home
