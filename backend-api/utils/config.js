require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY= process.env.AWS_SECRET_ACCESS_KEY
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR
const SIGNED_URL_EXPIRY = process.env.SIGNED_URL_EXPIRY
const SECRET = process.env.SECRET



module.exports = { 
  MONGODB_URI, 
  PORT, 
  BUCKET_NAME, 
  AWS_REGION, 
  AWS_ACCESS_KEY_ID, 
  AWS_SECRET_ACCESS_KEY, 
  DEFAULT_AVATAR,
  SIGNED_URL_EXPIRY,
  SECRET
}
