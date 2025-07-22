import { Link } from "react-router"
import toast from "react-hot-toast";
import { NotepadText, OctagonX, Plus, SquarePen, Trash2 } from "lucide-react";
import dateFormater from "./date-formater";
import { useGetNotes } from "./notes-get";
import { fetchApi } from "./rest-api";

export type NoteType = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// const NotesMock = [
//     {
//         "_id": "68310bc8ebe61b2cd3d10689",
//         "title": "my second title",
//         "content": "my second content",
//         "createdAt": "2025-01-01T23:59:01.014Z",
//         "updatedAt": "2025-01-01T23:59:01.014Z",
//         "__v": 0
//     },
//     {
//         "_id": "68310bc8ece61b2cd3d10689",
//         "title": "my first title",
//         "content": "my first content",
//         "createdAt": "2026-05-23T23:59:05.014Z",
//         "updatedAt": "2026-05-23T23:59:05.014Z",
//         "__v": 0
//     }

// ]

export default function NotesList() {

    const { success, loading, notes, setNotes } = useGetNotes()

    if (!success)
        return (
            <section className="w-full flex flex-col gap-4 justify-center items-center">
                <div className="flex gap-2 items-center">
                    <OctagonX className="pt-1 text-yellow-500 size-10" />
                    <span> Error al cargar notas.</span>
                </div>
            </section>
        )

    if (notes.length === 0 && !loading)
        return <NoNotes />

    return (
        <section className="w-full">
            {
                loading
                    ? (<div className="w-full h-full flex justify-center">
                        <span className="mx-auto text-2xl font-bold tracking-wider mt-32">Loading...</span>
                    </div>)
                    : (<article className="w-full h-full py-12 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {
                            notes.map(note => <Note key={note._id} note={note} setNotes={setNotes} />)
                        }
                    </article>)
            }
        </section>)

}

const NoNotes = () => {
    return (
        <section className="w-full h-full flex flex-col gap-4 mt-32 items-center">
            <div className="flex gap-2 items-center">
                <NotepadText className="size-7 text-blue-400 pt-1" />
                <span>No hay notas.</span>
            </div>
            <span>Agrega algunas notas</span>
            <Link to={"/createNote"} className="flex gap-2 items-center group">
                <span className="text-blue-600 group-hover:text-blue-400 duration-200">Agregar Nota</span>
                <Plus className="size-7 pt-1 text-blue-600 group-hover:text-blue-400 duration-200" />
            </Link>
        </section>
    )
}

const Note = ({ note, setNotes }: { note: NoteType, setNotes: React.Dispatch<React.SetStateAction<NoteType[]>> }) => {

    const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        if (!window.confirm("Seguro quieres eliminar la nota?")) return

        const { success, message, data } = await fetchApi.deleteNote(note._id)
        if (!success) {
            toast.error("No se pudo borrar la nota")
            console.log("Error del handleDelete", message)
            // return
        }
        toast.success(message)
        console.log("frontend nota borrada", data)
        setNotes(prev => prev.filter(prevNote => prevNote._id !== note._id))
        // return
    }

    return (
        <div className="flex flex-col h-max gap-4 p-8 bg-blue-950/30 backdrop-blur rounded-lg border border-blue-900">
            <p className="font-bold tracking-wider border-b py-1">{note.title}</p>
            <p>{note.content}</p>
            <div className="flex justify-between items-center">
                <span>{dateFormater(new Date(note.updatedAt))}</span>
                <div className="flex gap-2 items-center relative w-16 h-8">
                    <Link to={`/note/${note._id}`}><SquarePen className="absolute left-0 top-0 size-7 pt-1 text-blue-600 hover:text-blue-500 hover:scale-130 origin-center duration-200" /></Link>
                    <div onClick={handleDelete} className="cursor-pointer"><Trash2 className="absolute right-0 top-0 size-7 pt-1 text-blue-600 hover:text-blue-500 hover:scale-130 origin-center duration-200" /></div>
                </div>
            </div>
        </div>
    )
}