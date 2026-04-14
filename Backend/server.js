const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = require('./app');


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
    )
    .catch((error) => console.error('Error connecting to MongoDB:', error)
    )