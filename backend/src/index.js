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


const port = process.env.PORT
const app = require("./app")
app.get('/', (req, res) => {
    res.send('Server is running on port');
  });

app.listen(port ,console.log("server is running....."))