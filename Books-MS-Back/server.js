const path = require('path');

//Express App
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path: 'config.env'});
const cors = require('cors');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');

// Routes
const booksRoute = require('./routes/booksRoute');

const app = express();

// Connect with DB
dbConnection();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(cors());
app.options('*', cors());
app.enable('trust proxy');

app.use(cors());
//Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode : ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/books', booksRoute);

// Create error and sent it to error handling middleware
app.all('*', (req, res, next) =>{
    next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400))
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

// Handling Rejection outside express
// Events ==> list ==> callback(err)
process.on('unhandledRejection', (err)=>{
    console.log(`Unhandled Rejection Error: ${err.name} | ${err.message}`);

    // Close the server
    server.close(()=>{
        console.error('Shutting down... the server due to unhandled promise rejection');
        process.exit(1);
    });
});
