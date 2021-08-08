const express = require('express');
const path = require('path');
const CORS = require('cors');
require('dotenv').config({ path: `${path.join('environments',)}/${'dev'}.env` });
const app = express();
app.use(express.json({ strict: false }));
app.use(CORS());
const PORT = process.env.PORT || 8080;
const router = require('./routers');
const { UserHandlers } = require('./handler');

app.use('/api', router);
app.post('/login', UserHandlers.AuthenticateUser);
app.listen(PORT, (error)=> error ? console.log(error) : console.log(`http://localhost:${PORT}`));
