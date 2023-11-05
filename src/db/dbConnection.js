import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const conncetToDatabase = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    console.log(`Connected to database ! host: ${response.connection.host}`)
  } catch (error) {
    console.log("Error connecting to Database: " + JSON.stringify(error))
    process.exit(1)
  }
}

export default conncetToDatabase
