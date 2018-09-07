const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/api');
const mainApi = require('./routes/indexRoute');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', mainApi);
app.use('/api', api);

app.listen(PORT, function() {
  console.log('Server  running on localhost:' + PORT);
});
