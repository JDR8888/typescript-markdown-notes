import { useRef, useState, FormEvent } from 'react'
import {Form, Stack, Row, Col, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// gets a cool multi/custom select box from react-select
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from '../App';
import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void 
    onAddTag: (tag: Tag) => void 
    availableTags: Tag[]
} & Partial<NoteData>

export default function NoteForm({
    onSubmit,
    onAddTag,
    availableTags,
    title="",
    markdown="",
    tags=[],
    }: NoteFormProps ) {
    // set up refs for pieces of form
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef =useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            // ! basically says not to worry about potential null values because both inputs (title and markdown) are required w/ form control
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })
        // move us back one page
        navigate("..")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} 
                        required 
                        defaultValue={title} 
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId='tags'>
                        <Form.Label>Tags</Form.Label>
                        <CreatableReactSelect
                        onCreateOption={label => {
                            const newTag = {id: uuidV4(), label }
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev, newTag])
                        }}
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
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                    defaultValue={markdown}
                    ref={markdownRef} 
                    required as="textarea" 
                    rows={13} />
                </Form.Group>
                <Stack direction='horizontal' gap={3} className='justify-content-end'>
                    <Button type='submit' variant='outline-primary'> Save Note</Button>
                    <Link to="..">
                    <Button type='button' variant='secondary'> Cancel</Button>
                    </Link>
                </Stack>
            </Stack>

        </Form>
    )

}