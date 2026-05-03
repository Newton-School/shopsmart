const mongoose = require('mongoose')

const DbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('[MongoDB] MongoDB connected!!')
    } catch (error) {
        console.error('[MongoDB] Error connecting to MongoDB:', error)
        throw error
    }
}

module.exports = DbConnect