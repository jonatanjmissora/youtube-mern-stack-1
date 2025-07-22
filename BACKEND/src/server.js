import express from "express"
import cors from "cors"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"

const app = express()

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173/createNote"],
  })
)
app.use(express.json())
app.use("/api/notes", notesRoutes)

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on PORT: 5001")
  })
})