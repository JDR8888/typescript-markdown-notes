import { NoteData, Tag } from "../App"
import NoteForm  from "./NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void 
    onAddTag: (tag: Tag) => void 
    availableTags: Tag[]
}

export default function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return (
    <>
        <h1 className="mb-4"> Penny for your thoughts? </h1>

        {/* display the actual form where the notes will be entered */}
        <NoteForm 
        onSubmit={onSubmit} 
        onAddTag={onAddTag} 
        availableTags={availableTags}
        />
    </>
    ) 
}