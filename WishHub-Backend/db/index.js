const mongoose = require("mongoose");
const { DB_NAME } = require("../constants.js");

const connectDb = async () => {
  try {
    const connectionInstance =  await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
    console.log(`Db connected on `, connectionInstance.connection.host);
} catch (error) {
    console.log(`Error connecting MongoDb ${error}`);
    process.exit(1)
  }
};

module.exports = { connectDb };
