require('./db/index');
const morgan = require('morgan');
const menus = require('./routes/menus');
const items = require('./routes/items');
const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/menus', menus);
app.use('/api/items', items);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
