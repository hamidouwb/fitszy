require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/user')
const config = require('./utils/config')

// Migration script to convert existing avatarUrl to avatarKey
const migrateAvatarUrls = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Find all users with avatarUrl that is not the default
    const usersWithAvatars = await User.find({
      avatarUrl: { $exists: true, $ne: config.DEFAULT_AVATAR }
    })

    console.log(`Found ${usersWithAvatars.length} users with custom avatars`)

    let migratedCount = 0
    let errorCount = 0

    for (const user of usersWithAvatars) {
      try {
        // Extract S3 key from presigned URL
        // AWS S3 presigned URLs have format: https://bucket-name.s3.region.amazonaws.com/key?signature...
        const url = new URL(user.avatarUrl)
        const key = url.pathname.substring(1) // Remove leading slash

        if (key) {
          // Update user with avatarKey and remove avatarUrl
          await User.findByIdAndUpdate(user._id, {
            avatarKey: key,
            $unset: { avatarUrl: 1 }
          })
          migratedCount++
          console.log(`Migrated user ${user.userName}: ${key}`)
        } else {
          console.error(`Could not extract key from URL for user ${user.userName}: ${user.avatarUrl}`)
          errorCount++
        }
      } catch (error) {
        console.error(`Error migrating user ${user.userName}:`, error.message)
        errorCount++
      }
    }

    console.log(`Migration completed:`)
    console.log(`- Successfully migrated: ${migratedCount} users`)
    console.log(`- Errors: ${errorCount} users`)

  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateAvatarUrls()
}

module.exports = migrateAvatarUrls