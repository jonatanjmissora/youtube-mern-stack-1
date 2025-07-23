export type newNoteType = {
    title: string;
    content: string;
  }
  
const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

  export const fetchApi = {
  
    getNote: async (id: string) => {
      try {
        const data = await fetch(`${baseUrl}/notes/${id}`, {
          method: "GET",
        })
        const note = await data.json()
        return { success: true, message: "Nota obtenida", data: note }
  
      } catch (error) {
        console.log("Error en el controller.getNote", error)
        return { success: false, message: "no se pudo obtener" }
      }
    },
  
    getNotes: async () => {
      try {
        const data = await fetch(`${baseUrl}/notes/`, {
          method: "GET",
        })
        const notes = await data.json()
        return { success: true, message: "Notas obtenidas", data: notes }
  
      } catch (error) {
        console.log("Error en el controller.getNotes", error)
        return { success: false, message: "no se pudo obtener" }
      }
    },
  
    createNote: async (newNote: newNoteType) => {
      try {
        const res = await fetch(`${baseUrl}/notes/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newNote.title, content: newNote.content }),
        })
        const createdNote = await res.json()
        return { success: true, message: "Nota creada", data: createdNote }
  
      } catch (error) {
        console.log("Error en el controller.createNote", error)
        return { success: false, message: "no se pudo crear" }
      }
    },
  
    deleteNote: async (id: string) => {
      try {
        const res = await fetch(`${baseUrl}/notes/${id}`, {
          method: "DELETE",
        })
        const deletedNote = await res.json()
        return { success: true, message: "Nota borrada", data: deletedNote }
      } catch (error) {
        console.log("Error en el controller.deleteNote", error)
        return { success: false, message: "no se pudo borrar" }
      }
    },
  
    updateNote: async (id: string, newNote: {title: string, content: string}) => {
      try {
        const res = await fetch(`${baseUrl}/notes/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newNote.title, content: newNote.content }),
        })
        const updatedNote = await res.json()
        return { success: true, message: "Nota editada", data: updatedNote }
      } catch (error) {
        console.log("Error en el controller.updateNote", error)
        return { success: false, message: "no se pudo editar" }
      }
    },
  
  }