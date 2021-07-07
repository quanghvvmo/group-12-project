const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./router/index.router');
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening port ${process.env.PORT}`);
})