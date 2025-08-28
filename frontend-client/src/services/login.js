import axios from 'axios'
const baseUrl = 'http://localhost:4000/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl,
    {
      userName: credentials.username, 
      password: credentials.password
    }
  )
  return response.data
}

export default { login }
