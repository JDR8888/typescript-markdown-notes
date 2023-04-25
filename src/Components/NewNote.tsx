import { NoteData } from "../App"
import NoteForm  from "./NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void 
}

export default function NewNote({ onSubmit }: NewNoteProps) {
    return (
    <>
        <h1 className="mb-4"> this is le new note page </h1>

        <NoteForm onSubmit={onSubmit} />
    </>
    ) 
}