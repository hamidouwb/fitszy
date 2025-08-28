const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require('crypto');
const config = require("../utils/config");

// --- S3 Client Initialization ---
// Initialize the S3 client with credentials and region from your config.
const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  region: config.AWS_REGION
});

// Generates a random string to use as a unique file key.
const randomMediaName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

/**
 * Uploads a file to the S3 bucket.
 * @param {object} file - The file object from multer (containing buffer and mimetype).
 * @returns {Promise<string>} - The generated key for the uploaded file.
 */
const uploadFile = async (file) => {
  const key = randomMediaName();
  const command = new PutObjectCommand({
    Bucket: config.BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  });

  await s3.send(command);
  return key;
};

/**
 * Deletes multiple files from the S3 bucket in a single batch operation.
 * @param {Array<object>} keys - An array of key objects, e.g., [{ Key: 'key1' }, { Key: 'key2' }].
 * @returns {Promise<void>}
 */
const deleteFiles = async (keys) => {
  // If the array is empty, no need to make an API call.
  if (!keys || keys.length === 0) {
    return;
  }

  const deleteParams = {
    Bucket: config.BUCKET_NAME,
    Delete: { Objects: keys },
  };
  const deleteCommand = new DeleteObjectsCommand(deleteParams);
  await s3.send(deleteCommand);
};

/**
 * Generates a temporary, signed URL to access a private file in S3.
 * @param {string} key - The key of the file in the S3 bucket.
 * @returns {Promise<string>} - The signed URL.
 */
const getFileUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: config.BUCKET_NAME,
        Key: key,
    });
    // The URL will expire based on the duration set in your config file.
    const url = await getSignedUrl(s3, command, { expiresIn: config.SIGNED_URL_EXPIRY });
    return url;
};


module.exports = {
  uploadFile,
  deleteFiles,
  getFileUrl
};

