const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
const TaskRouter = require('./routes/Task.router');
const AuthRouter = require('./routes/Auth.router');
const UserRouter = require('./routes/User.Router');
const {connectDB} = require('./config/db');
dotenv.config();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,               
}));
app.use(cookieParser());
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


app.use('/api/tasks', TaskRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})