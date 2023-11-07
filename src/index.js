import dotenv from "dotenv"
import conncetToDatabase from "./db/dbConnection.js"
import app from "./app.js"

dotenv.config({
  path: "../.env",
})

app.on("error", (error) => {
  console.log("Error: ", error)
  throw error
})

conncetToDatabase()
  .then(
    // application listener
    app.listen(process.env.PORT || 8080, () =>
      console.log(`Server is listening on ${process.env.PORT || 8080}`)
    )
  )
  .catch((error) => console.log("Error connecting database ", error))
