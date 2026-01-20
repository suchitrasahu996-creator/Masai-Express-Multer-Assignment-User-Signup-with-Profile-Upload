const express = require ("express");
const userRouter =require ("./routes/users.routes");
require ("dotenv").config();
const app = express();

app.use (express.json());

app.use("/users",userRouter);

const PORT = process.env.port || 3000;

app.listen (PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});