import { Container, Box } from '@mui/material'
import Logo from '../components/Logo'
import NavBar from './NavBar'

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
          height: '100vh',
        }}
      >
        <Box sx={{ mb: 10, mt: -10 }}>
          <Logo />
        </Box>
      </Container>
    </>
  )
}

export default Home
