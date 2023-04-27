// import { useLocalStorage } from 
import { Routes, Route, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
// import Home from './Home'
import  NewNote  from "./Components/NewNote"
import { useMemo } from 'react'
import { useLocalStorage } from "./utils/useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import  NoteList  from "./Components/NoteList"
import NoteLayout from "./Components/NoteLayout"
import  Note  from "./Components/Note"
import EditNote from "./Components/EditNote"


export type NoteData = {
  title: string 
  markdown: string 
  tags: Tag[]
}

export type Tag = {
  id: string 
  label: string 
}

export type Note = {
  id: string  
} & NoteData

export type RawNote = {
  id: string 
} & RawNoteData

export type RawNoteData = {
  title: string 
  markdown: string 
  tagIds: string[]
}



function App() {

  // store notes in local storage for persistance
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote ({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function onUpdateNote (id: string, { tags, ...data }: NoteData ) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag => tag.id) }
        }
        else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return {...tag, label}
        }
        else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-5">
      <Routes>
        <Route path='/' element={<NoteList notes={notesWithTags} 
        availableTags={tags} 
        onUpdateTag={updateTag}
        onDeleteTag={deleteTag}
        />
        } 
        />
        {/* for any wildcard routes we just send user to home */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/new" 
          element={
            <NewNote 
              onSubmit={onUpdateNote} 
              onAddTag={addTag} 
              availableTags={tags} 
            />
          } 
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path="edit" element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
              />
            } 
          />
        </Route>
      </Routes>
      </Container>
  )
}

export default App
