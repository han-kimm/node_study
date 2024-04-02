require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PW,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PW,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PW,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
