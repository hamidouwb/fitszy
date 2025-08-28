import axios from 'axios'
const baseUrl = '/api/users'

const create = async (newUser) => {
  // Use FormData because of the image upload
  const formData = new FormData()
  Object.keys(newUser).forEach(key => {
    formData.append(key, newUser[key])
  })

  const response = await axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export default { create }
