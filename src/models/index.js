const config = require("../static/db.static.js")[process.env.NODE_ENV];

const seq = require("sequelize");
const {Sequelize, DataTypes} = seq

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool?.max,
    min: config.pool?.min,
    acquire: config.pool?.acquire,
    idle: config.pool?.idle
  },
  define: {
    timestamps: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;