import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connection.once('open', () => {
    console.log('database is connected to ' + process.env.MONGO_URL)
    //insert test data
    // generateTestData()
    //     .then(() => console.log('data filled'))
    //     .catch((err) => console.log(err))
})
mongoose.connection.on('error', err => {
    throw new Error(err)
})
const dbConnect = async () => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export default dbConnect