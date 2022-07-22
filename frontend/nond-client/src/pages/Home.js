import React, { useState, useEffect } from 'react'
import { Container, Box } from '@mui/material'
import axios from "axios";
import NavBar from './NavBar'
import Logo from '../components/Logo'
import MyAnimals from '../components/MyAnimals'
import AnimalsControls from '../components/AnimalsControls'

const Home = ({ LoggedUser, setAuth }) => {
  const [myAnimals, setMyAnimals] = useState([])

  function getString(){
    axios.get(`http://localhost:8080/`).then((res) => {
      setMyAnimals(res.data);
  });
  }

  useEffect(() => {
    getString();
  }, [])

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
        {/* <AnimalsControls setMyAnimals={setMyAnimals} />
        <MyAnimals myAnimals={myAnimals} /> */}
        {myAnimals}
      </Container>
    </>
  )
}

export default Home
