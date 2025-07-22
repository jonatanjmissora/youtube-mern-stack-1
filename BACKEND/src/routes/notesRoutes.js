import express from "express"
import notesControllers from "../controllers/notesControllers.js"

const router = express.Router()

// Rutas de notas
router.get("/", notesControllers.show)
router.get("/:id", notesControllers.showOne)
router.post("/", notesControllers.create)
router.put("/:id", notesControllers.update)
router.delete("/:id", notesControllers.delete)

export default router