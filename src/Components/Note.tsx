import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import {Row, Col, Stack, Badge, Button } from 'react-bootstrap'
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import ReactMarkdown  from "react-markdown";

type NoteProps = {
    onDelete: (id: string) => void
}

export default function Note( { onDelete }: NoteProps ) {

const note = useNote();
const navigate = useNavigate();

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction='horizontal' className='flex-wrap'>
                            {note.tags.map(tag => (
                                <Badge className='text-truncate' key={tag.id}>{tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto" >
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`}>
                            <Button variant="outline-primary">Edit</Button>
                        </Link>
                        <Button 
                        onClick={() => {
                            onDelete(note.id)
                            navigate("/")
                        }}
                        
                        variant="danger">Destroy</Button>
                        <Link to="/">
                            <Button variant="secondary">Go Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>

        </>

    )
}