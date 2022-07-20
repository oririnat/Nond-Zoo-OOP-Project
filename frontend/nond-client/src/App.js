import { useState } from 'react'
import { CssBaseline } from '@mui/material'
import {
  Route,
  BrowserRouter as Router,
  Navigate,
  Routes,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [auth, setAuth] = useState(false);
  const [LoggedUser, setLoggedUser] = useState(undefined);

  return (
    <>
      <CssBaseline />
      <Router>
        <Routes >
          <Route path="/login" element={<Login setLoggedUser={setLoggedUser} setAuth={setAuth} />} />
          <Route
            path="/"
            element={
              auth ? (
                <Home LoggedUser={LoggedUser} setAuth={setAuth} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
