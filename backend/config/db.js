const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {}) 

        console.log(`MongoDB Connected: ${connection.connection.host}`)
    }catch (error) {
        console.log(`Error: ${error.message}`)
        console.log(process.env.MONGO_URI)
        process.exit()
    }
}


module.exports = connectDB