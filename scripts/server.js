// global.env = require('./env').get('dev_hml');

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const path = require('path');
const cors = require('cors');
const webpackConfig = require('./webpack.config.dev');

const compiler = webpack(webpackConfig);
const app = express();

// const route = require('./routes/systemapp')

// app.use((req, res, next) => {
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

//     // res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     // res.header('Expires', '-1');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Pragma', 'no-cache');

//     app.use(cors());
//     next();
// });

// app.use(route);

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '..')));
app.use(middleware(compiler, { publicPath: '/dist', writeToDisk: true }));

module.exports = app.listen(3000, () => {
  console.log('Server is running on the port no. 3000');
});
