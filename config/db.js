const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log(`Database connected: ${conn.connection.host}`.yellow.bold)
}

module.exports = connectDB