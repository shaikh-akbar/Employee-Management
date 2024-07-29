const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_TASK"
    }).then(() => {
        console.log('connected to db');
    }).catch((err) => {
        console.log(`some error occured while connecting database ${err}`);
    });
};

module.exports = dbConnection;
