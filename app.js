const express = require("express")
const { connect } = require("mongoose")
const connectDB = require("./config/db")
const path = require("path");

const app = express()

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}))


// Defining Routes
app.use("/api/users",require("./routes/users"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/companies",require("./routes/companies"))


// to server static assets in production
if(process.env.NODE_ENV === "production") {
   // setting static folder
   app.use(express.static("client/build"));

   app.get("*", (req,res)=> res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log
(`Server running on port ${PORT} 🔥`));