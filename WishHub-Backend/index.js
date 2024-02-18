require("dotenv").config({});
const { app } = require("./app");
const { connectDb } = require("./db/index");


const PORT = process.env.PORT

connectDb()
  .then(() => {
    try {
      app.listen(PORT , () => {
        console.log(`Server booted on port ${PORT}`);
      });
    } catch (error) {
      console.log(`Server booting failed ${error}`);
    }
  })
  .catch((err) => {
    console.log(`Error connecting Db ${err}`);
  });
