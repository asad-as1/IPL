const mongoose  = require('mongoose')

const dotenv  = require('dotenv')
dotenv.config()

const URI = process.env.URI
const connectDb = async() => {
    try {
        const connect = await mongoose.connect(URI)
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}
connectDb()

app.get('/', (req, res) => {
    res.send('Server is running');
  });

const app = require("./app")
const port = process.env.PORT
app.listen(port ,console.log("server is running....."))