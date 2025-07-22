import { useEffect, useState } from "react"
import type { NoteType } from "./notes-list"
import { fetchApi } from "./rest-api"

export const useGetNote = (id: string) => {

  const [note, setNote] = useState<NoteType>()
  const [success, setSuccess] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getNote = async () => {
      try {
        const { success: resSuccess, data } = await fetchApi.getNote(id)
        if (resSuccess) {
          setNote(data)
        }
        else 
          setSuccess(false)
      } catch (error) {
        console.log("Error al cargar notas", error)
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    }
    getNote()
  }, [])

  console.log("en useGetNote: ", note)

  return { success, loading, note, setNote }
}

export const useGetNotes = () => {

  const [notes, setNotes] = useState<NoteType[]>([])
  const [success, setSuccess] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getNotes = async () => {
      try {
        const { success: resSuccess, data } = await fetchApi.getNotes()
        if (resSuccess) {
          setNotes(data)
        }
      } catch (error) {
        console.log("Error al cargar notas", error)
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    }
    getNotes()
  }, [])

  return { success, loading, notes, setNotes }
}