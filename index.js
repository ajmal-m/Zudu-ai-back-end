const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const TaskRouter = require('./routes/Task.router');
dotenv.config();


app.use(cors());
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


app.use('/api/tasks', TaskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});