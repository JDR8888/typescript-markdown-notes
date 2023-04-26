import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App";

type NoteLayoutProps = {
    notes: Note[]

}


export default function NoteLayout( { notes }: NoteLayoutProps ) {
    const { id } = useParams()
    const note = notes.find(n => n.id === id)
    // if there are no notes or if the selected note (id) is not found, the user will be returned to the home screen. and the replace prevents the user from pressing the back arrow to return to the note (since it doesn't exist, the url has been replaced by the home page)
    if (note == null) return <Navigate to="/" replace />

    return <Outlet context={note} />

}

export function useNote() {
    return useOutletContext<Note>();
}