const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const multer = require('multer');


require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors())

const advertisementRouter = require(path.join(__dirname, 'routes', 'advertisementRoutes'))
const companieRouter = require(path.join(__dirname, 'routes', 'companieRoutes'));
const adminRouter = require(path.join(__dirname, 'routes', 'adminRoutes'));
const authRouter = require(path.join(__dirname, 'routes', 'authRoutes'));
const userRouter = require(path.join(__dirname, 'routes', 'userRoutes'));
const applicationRouter = require(path.join(__dirname, 'routes', 'applicationRoutes'));

app.use('/advertisements', advertisementRouter);
app.use('/companies', companieRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/applications', applicationRouter);

app.listen(3001);