import { useMemo, useState } from 'react';
import { Row, Stack, Col, Button, Form, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from "react-select";
import { Tag } from '../App';
import styles from "../assets/NoteList.module.css"



type SimplifiedNote = {
    tags: Tag[]
    title: string 
    id: string 
}
type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

export default function NoteList({ availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] =useState("")
    
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                title === "" || 
                note.title.toLowerCase().includes(title.toLowerCase())) && 
            (selectedTags.length === 0 || 
                // if there are tags (length > 0), go through every tag and check if the note contains the tag at each loop (e.g. if the user only selected one tag, all cards that have that tag will be displayed. however, if the user selects an additional tag for the search, then only notes that have BOTH SELECTED tags will be displayed. this check is done for every single tag that has been selected, basically to narrow down the search as much as the user wants)
              selectedTags.every(tag => 
                note.tags.some(noteTag => noteTag.id === tag.id)
              ))
        })
    }, [title, selectedTags, notes])
    

    return <>
    <Row className='align-items-center mb-5' >
        <Col><h1>Deez Notes</h1></Col>
        <Col xs="auto">
            <Stack gap={2} direction='horizontal'>
                <Link to="/new">
                    <Button variant="outline-primary">Make a Note</Button>
                </Link>
                <Button variant='secondary'>Change ya tags</Button>
            </Stack>
        </Col>
    </Row>
    <Form>
        <Row className='mb-4'>
            <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value) } />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId='tags'>
                    <Form.Label>Tags</Form.Label>
                    <ReactSelect
                        value={selectedTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        options={availableTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                return { label: tag.label, id: tag.value }
                            }))
                        }}
                        isMulti />
                </Form.Group>
            </Col>
        </Row>
    </Form>
    <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map(note => (
            <Col key={note.id}>
                {/* notecard component described below - takes id, title, and tags from notelist */}
                <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
        ))}
    </Row>
    </>
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return <Card as={Link} to={`${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className='align-items-center justify-content-center h-100'>
                {/* pass in the title */}
                <span className='fs-5'>{title}</span>
                {/* if there are tags --> map through tags array and add each in a bootstrap badge element */}
                {tags.length > 0 && (
                    <Stack gap={1} direction='horizontal' className='justify-content-center flex-wrap'>
                        {tags.map(tag => (
                            <Badge className='text-truncate' key={tag.id}>{tag.label}
                            </Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}