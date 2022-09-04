const express = require("express");
const sequelize = require("./src/configs/database.config");
const app = express();
const PORT = 3000;

app.use(express.json());

//TESTING DATABASE CONNECTIVITY
sequelize
  .authenticate()
  .then(() => console.log("DATABASE CONNECTED..."))
  .catch((err) => console.log("ERROR: ", err));

//LISTENING TO SERVER
app.listen(PORT, () => {
  console.log("LISTENING TO SERVER");
});
