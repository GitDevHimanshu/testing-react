const express = require("express")
const cors = require("cors")
const session = require('express-session');
const authRoute = require('./routes/authroutes')
const adminRoute = require('./routes/adminroutes')
const dbConnection = require('./model/dbConnection')
const dotenv = require("dotenv")

const app = express();
dbConnection()

app.use(cors({
    origin: "*"  
})) 

app.use(session({
    secret: "I-will-not-tell-you",
    resave: 'false',
    saveUninitialized: 'true',
    // Cookie: {maxage: 40000},
    // rolling: true
}))

app.use(express.json());

// app.get("*",(req,res)=>{
//     res.sendFile(__dirname+"../client/index.html");
// })

app.use('/', authRoute)
app.use('/admin', adminRoute )


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server started at port 3000`)
})