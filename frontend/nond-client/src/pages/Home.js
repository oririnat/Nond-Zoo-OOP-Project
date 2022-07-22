import React, { useState, useEffect } from 'react'
import { Container, Box } from '@mui/material'
import axios from 'axios'
import NavBar from './NavBar'
import Logo from '../components/Logo'
import MyAnimals from '../components/MyAnimals'
import AnimalsControls from '../components/AnimalsControls'
import { handleAnimalDeletion } from '../components/Shared/ApiCalls'
import { errorWithMessage } from '../components/Shared/swalAlerts'

const Home = ({ LoggedUser, setAuth }) => {
  const [myAnimals, setMyAnimals] = useState([])

  function getAnimals() {
    console.log('getting animals')
    axios
      .get('http://localhost:8080/animals')
      .then((res) => {
        console.log(res)
        setMyAnimals(res.data)
      })
      .catch((err) => {
        console.log('got error while retirieving animals', err)
        errorWithMessage('got error while retirieving animals')
      })
  }

  useEffect(() => {
    getAnimals()
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
        <AnimalsControls
          setMyAnimals={setMyAnimals}
          getAnimals={getAnimals}
        />
        <MyAnimals
          myAnimals={myAnimals}
          handleAnimalDeletion={handleAnimalDeletion}
          triggerAnimalsRetrieval={getAnimals}
        />
      </Container>
    </>
  )
}

export default Home
