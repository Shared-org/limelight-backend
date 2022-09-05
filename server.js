const express = require("express");
const sequelize = require("./src/configs/database.config");
const db = require("./src/models/index.js");

const app = express();
const PORT = 3000;

app.use(express.json());

//TESTING DATABASE CONNECTIVITY
// sequelize
//   .authenticate()
//   .then(() => console.log("DATABASE CONNECTED..."))
//   .catch((err) => console.log("ERROR: ", err));


db.sequelize.sync();

//LISTENING TO SERVER
app.listen(PORT, () => {
  console.log("LISTENING TO SERVER");
});
