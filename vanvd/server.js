const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./router/index.router');
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening port ${process.env.PORT}`);
})