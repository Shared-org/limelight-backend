const express = require("express");
const swaggerUi = require("swagger-ui-express");
const db = require("./src/models/index.js");
const testRouter = require("./src/routes/test.route");
const swaggerDocs = require("./src/static/swagger.static");

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//* DEFINING ROUTERS *//
app.use("/api", testRouter);

//* TESTING DATABASE CONNECTIVITY *//
// db.sequelize
//   .authenticate()
//   .then(() => console.log("DATABASE CONNECTED..."))
//   .catch((err) => console.log("ERROR: ", err));

// db.sequelize.sync();

// * LISTENING TO SERVER
app.listen(PORT, () => {
  console.log("LISTENING TO SERVER");
});
