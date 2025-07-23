import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useActionState } from "react";
import { ArrowLeft } from "lucide-react";
import { fetchApi } from "./rest-api";

export default function CreateNotePage() {
  return (
    <section className="w-full px-6">

      <article className="w-full flex flex-col">

        <Link to={"/"} className="flex gap-2 items-center">
          <ArrowLeft className="size-7 text-blue-600 pt-1" />
          <span className="text-blue-600 text-xl">Volver</span>
        </Link>

        <div className="mx-auto mt-20">
          <CreateNoteForm />
        </div>

      </article>
    </section>
  )
}

const CreateNoteForm = () => {

  const navigate = useNavigate()

  const [, formAction] = useActionState(async (_prevState: null, formData: FormData) => {
    const { title, content } = Object.fromEntries(formData.entries())
    if (!title.toString().trim() || !content.toString().trim()) {
      toast.error("Completa todos los campos")
      return null
    }
    const newNote = { title, content } as { title: string, content: string }

    const { success, message, data } = await fetchApi.createNote(newNote)
    if (!success) {
      toast.error("No se pudo crear Nota")
      console.log("Error del createform", message)
      return null
    }
    toast.success(message)
    console.log("frontend nota creada: ", data)
    navigate("/")
    return null
  }, null)

  return (
    <form action={formAction} className="w-full flex flex-col gap-6 p-8 bg-slate-400 rounded-lg">
      <p className="text-xl font-bold tracking-wider border-b">Crear una nueva nota</p>

      <div className="flex gap-2 items-center w-full">
        <label htmlFor="title" className="w-1/3">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          className="bg-white rounded-lg px-2 py-1 w-2/3 text-black"
        />
      </div>

      <div className="flex gap-2 w-full">
        <label htmlFor="content" className="w-1/3">Contenido:</label>
        <textarea
          id="content"
          name="content"
          className="bg-white rounded-lg px-2 py-1 w-2/3 text-black"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Crear
      </button>
    </form>
  )
}