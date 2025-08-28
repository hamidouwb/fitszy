import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import ProgramDetail from './components/ProgramDetail'
// import WorkoutDetail from './components/WorkoutDetail' // Create this component later

import programService from './services/programs'

const App = () => {
  const [user, setUser] = useState(null)

  // Check for logged-in user on initial load
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      programService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <Router>
      {/* Set the dark theme for the entire app */}
      <div data-theme="night" className="min-h-screen bg-base-200">
        <Navbar user={user} handleLogout={handleLogout} />
        <main className="p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate replace to="/" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate replace to="/" />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            {/* <Route path="/workouts/:id" element={<WorkoutDetail />} /> */}
            <Route path="/" element={<Home user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
