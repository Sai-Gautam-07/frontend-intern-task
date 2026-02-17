const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"));

app.get("/", (req,res)=>{
  res.send("API Running");
});

app.listen(5000, ()=>{
  console.log("Server started on 5000");
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/tasks", require("./routes/taskRoutes"));
