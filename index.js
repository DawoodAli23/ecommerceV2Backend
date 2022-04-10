//variables

const express = require("express");
const {  } = require("./models/users");
const PORT = 4000;
const app = express();


//middlewares
app.use(express.json());

app.use("/user",require("./routes/users"))



//functions
app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>");
})
