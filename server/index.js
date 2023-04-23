const express = require('express');
const app = express();
const mongoose = require('./database/db');
const route = require('./routes/registrationRoute');
const cors=require('cors');
const port=process.env.PORT ||5000
app.use(cors({ origin: ["http://localhost:3000","https://registration-app.onrender.com"] }));
app.use(express.json());

app.use('/', route);

app.listen(port, () => {
  console.log('Server started');
});
