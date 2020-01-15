require('./db/index');
const morgan = require('morgan');
const express = require('express');
const routes = require('./routes/index');

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
