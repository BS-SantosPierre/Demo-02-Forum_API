const express = require('express');
require('dotenv').config();

const { PORT } = process.env;

const app = express();

// Initialize DB
const db = require('./models');

db.sequelize.authenticate()
			.then(() => console.log("Connection DB - OK"))
			.catch((error) => console.log("Connection DB - NOT OK", error));

// db.sequelize.sync();
// Middleware
app.use(express.json());

// Routing
const router = require('./routes');
app.use('/api' ,router);

app.listen(PORT, () => {
	console.log(`Listenning to http://localhost:${PORT}`);
});
