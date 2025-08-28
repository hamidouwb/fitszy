import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import programService from '../services/programs'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      programService.setToken(user.token) // Set token for other services
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <div className="hero min-h-[calc(100vh-100px)] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Access your personalized workout plans and track your progress. Let's achieve your fitness goals together.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
            <div className="form-control">
              <label className="label"><span className="label-text">Username</span></label>
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                placeholder="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
            <div className="divider">OR</div>
            <button type="button" className="btn btn-outline" disabled>Login with Google</button>
            <p className="text-center text-sm mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="link link-primary">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
