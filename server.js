const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')

// load config vars

dotenv.config({
    path: './config/config.env'
})

//connect to database
connectDB()

//load route file
const bootcamps = require('./routes/bootcamps')
const errorHandler = require('./middleware/error')

const app = express();

//use body parser
app.use(express.json());
//dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps)

//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port:${PORT}`));

//handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);

    server.close(() => process.exit(1));
})