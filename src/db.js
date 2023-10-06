import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log("DataBase connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}