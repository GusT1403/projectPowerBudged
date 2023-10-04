import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/fttx-project")
        console.log("DataBase connected")
    } catch (error) {
        console.log(error)
    }
}