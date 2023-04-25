import { useRef, useState } from 'react'
import {Form, Stack, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// gets a cool multi/custom select box from react-select
import CreatableReactSelect from "react-select/creatable";
import { NoteData } from '../App';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

export default function NoteForm({onSubmit}: NoteFormProps ) {
    // set up refs for pieces of form
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef =useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            // ! basically says not to worry about potential null values because both inputs (title and markdown) are required w/ form control
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: []
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} required />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId='tags'>
                        <Form.Label>Tags</Form.Label>
                        <CreatableReactSelect value={selectedTags.map(tag => {
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
                    <Form.Control ref={markdownRef} required as="textarea" rows={13} />
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