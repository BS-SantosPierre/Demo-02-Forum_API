const{ Sequelize } = require('sequelize');

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SERVER, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_SERVER,
	port: DB_PORT,
	dialect: 'postgres'
})

const db = {};

db.sequelize = sequelize;

db.Tag = require('./tag')(sequelize);
db.User = require('./user')(sequelize);

module.exports = db;
