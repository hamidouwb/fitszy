import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../services/users'

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    avatar: null,
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'avatar') {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      await userService.create(formData)
      setSuccess('Registration successful! Please log in.')
      setTimeout(() => navigate('/login'), 2000)
    } catch (exception) {
      setError(exception.response?.data?.error || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-2xl mb-4">Create an Account</h2>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">First Name</span></label>
              <input type="text" name="firstName" placeholder="John" className="input input-bordered" onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Last Name</span></label>
              <input type="text" name="lastName" placeholder="Doe" className="input input-bordered" onChange={handleChange} />
            </div>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Username</span></label>
            <input type="text" name="userName" placeholder="johndoe" className="input input-bordered" onChange={handleChange} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" placeholder="john.doe@example.com" className="input input-bordered" onChange={handleChange} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" placeholder="••••••••" className="input input-bordered" onChange={handleChange} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Avatar (Optional)</span></label>
            <input type="file" name="avatar" className="file-input file-input-bordered w-full" onChange={handleChange} />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">Sign Up</button>
          </div>
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
