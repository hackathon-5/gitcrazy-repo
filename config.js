var dotenv = require('dotenv');
dotenv.load();

module.exports = {
  mysql: {
    connectionLimit: process.env.CONNECTIONLIMITI || 10,
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || ''
  }
}