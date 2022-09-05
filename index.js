const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const PORT = 8000;
const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'api-doc')));

const auth = require('./auth');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
