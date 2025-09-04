import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
const DEFAULT_AVATAR =  import.meta.env.VITE_DEFAULT_AVATAR



const Navbar = ({ user, handleLogout }) => {
  console.log(DEFAULT_AVATAR)

  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || DEFAULT_AVATAR)

  // Update avatar URL when user changes
  useEffect(() => {
    setAvatarUrl(user?.avatarUrl || DEFAULT_AVATAR)
  }, [user])

  const handleAvatarError = async () => {
    // If avatar fails to load, try to refresh the URL
    if (user?.id) {
      try {
        const freshUrl = await userService.getAvatarUrl(user.id)
        setAvatarUrl(freshUrl)
      } catch (error) {
        console.error('Failed to refresh avatar URL:', error)
        // Fallback to default avatar
        setAvatarUrl('/default-avatar.svg')
      }
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          <span className="text-primary">Fit</span>Flow
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={avatarUrl}
                  alt="User avatar"
                  onError={handleAvatarError}
                />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        ) : (
          <div className="space-x-2">
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
