const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

// Use connection URL for Postgres, individual options for SQLite
const sequelize = dbConfig.url
  ? new Sequelize(dbConfig.url, {
      dialect: dbConfig.dialect,
      dialectOptions: dbConfig.dialectOptions,
      logging: false,
      pool: dbConfig.pool
    })
  : new Sequelize({
      dialect: dbConfig.dialect,
      storage: dbConfig.storage,
      logging: false,
      pool: dbConfig.pool
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize);

module.exports = db;

