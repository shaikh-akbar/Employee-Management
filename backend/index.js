const express = require('express')
const cors = require('cors')
const {config} = require('dotenv')
const dbConnection  = require('./database/dbConnection')
const authRouter = require('./routes/authRoute')
const employeeRouter = require('./routes/employeeRoute')
const { errorMiddleware } = require('./middleware/errorMiddleware')
const path = require('path');
const fs = require('fs');

const app = express()
app.use(cors({
    origin: '*',
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));
config({ path: "./config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

dbConnection()

app.use('/api/user',authRouter)
app.use('/api/employee',employeeRouter)
app.use(errorMiddleware)


app.listen(process.env.PORT,()=>{
    console.log(`server is runnning on port ${process.env.PORT}`)
})