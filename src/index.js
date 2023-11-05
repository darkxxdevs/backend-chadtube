import dotenv from "dotenv"
import conncetToDatabase from "./db/dbConnection.js"
import app from "./app.js"

dotenv.config({
  path: "../.env",
})

conncetToDatabase()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
