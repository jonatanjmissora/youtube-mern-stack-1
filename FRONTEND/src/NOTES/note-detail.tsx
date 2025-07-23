import { useActionState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import type { NoteType } from "./notes-list";
import { ArrowLeft } from "lucide-react";
import { useGetNote } from "./notes-get";
import { fetchApi } from "./rest-api";

export default function DetailNotePage() {

  const { id } = useParams()
  const { success, loading, note } = useGetNote(id ?? "0")

  return (
    <section className="h-full w-full">

      <article className="w-full h-full flex flex-col">

        <Link to={"/"} className="flex gap-2 items-center">
          <ArrowLeft className="size-7 text-blue-600 pt-1" />
          <span className="text-blue-600 text-xl">Volver</span>
        </Link>

        <div className="h-full mx-auto mt-20">
          {
            loading
              ? <span>Loading...</span>
              : success ? <UpdateNoteForm note={note} /> : <span>⚠ Error de carga</span>
          }

        </div>

      </article>

    </section>
  )
}

const UpdateNoteForm = ({ note }: { note: NoteType | undefined }) => {

  const navigate = useNavigate()
  if (!note) return <span>No existe nota</span>

  const [, formAction] = useActionState(async (_prevState: null, formData: FormData) => {
    const { title, content } = Object.fromEntries(formData.entries())
    if (!title.toString().trim() || !content.toString().trim()) {
      toast.error("Completa todos los campos")
      return null
    }
    const newNote = { title, content } as { title: string, content: string }

    const { success, message, data } = await fetchApi.updateNote(note._id, newNote)
    if (!success) {
      toast.error("No se pudo editar Nota")
      console.log("Error del updateform", message)
      return null
    }
    toast.success(message)
    console.log("frontend nota editada: ", data)
    navigate("/")
    return null
  }, null)

  return (
    <form action={formAction} className="flex flex-col gap-6 w-max p-8 bg-slate-400 rounded-lg">
      <p className="text-xl font-bold tracking-wider border-b">Editar nota</p>

      <div className="flex gap-2 items-center w-full">
        <label htmlFor="title" className="w-1/3">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          className="bg-white rounded-lg px-2 py-1 w-2/3 text-black"
          defaultValue={note?.title}
        />
      </div>

      <div className="flex gap-2 w-full">
        <label htmlFor="content" className="w-1/3">Contenido:</label>
        <textarea
          id="content"
          name="content"
          className="bg-white rounded-lg px-2 py-1 w-2/3 text-black"
          defaultValue={note?.content}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Editar
      </button>
    </form>
  )
}
