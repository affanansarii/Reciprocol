const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoLink = 'mongodb://localhost:27017/reciprocol';
    // const mongoLink = 'mongodb+srv://affanansarii:Safwaan@7@atlascluster.imsn6ck.mongodb.net/';

    try {

        await mongoose.connect(mongoLink, {

            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('MongoDB connected');

    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }

}

module.exports = connectDB;