const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./src/router/index.router');
const cors = require('cors');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening port ${process.env.PORT}`);
})