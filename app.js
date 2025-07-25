const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 4000;
const web = require("./Routes/web")
const connectDB = require('./DB/ConnectDB')
const fileUpload = require('express-fileupload')

const cookiesParser = require('cookie-parser')
app.use(cookiesParser())

connectDB()
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json())


app.get('/', (req, res) => {
  res.send("Server is working!");
});

app.use('/api',web)  //localhost:8000/api

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})
