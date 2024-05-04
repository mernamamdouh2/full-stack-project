import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap'

import AddBookHook from '../../Hook/books/add-book-hook';
import ButtonCustom from '../Utility/ButtonCustom';
import React from 'react'
import { ToastContainer } from 'react-toastify';

const AddBook = () => {
    const [show, loading, isPress,validated, handleClose, handleShow, onChangeBookTitle, onChangeAuthorName, 
        onChangePublishDate, onChangeDesBook, onChangeImageCover, bookTitle, authorName, publishDate,
        bookDescription, image, handleSubmit] = AddBookHook()
        
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>Add Book</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationTitleBook">
                            <Form.Label>Title Book</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Title Book"
                                value={bookTitle}
                                onChange={onChangeBookTitle}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a Title Book.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationAuthorName">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Author Name"
                                value={authorName}
                                onChange={onChangeAuthorName}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a Author Name.
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationPublishDate">
                                <Form.Label>Publish Date</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    placeholder="Publish Date"
                                    value={publishDate}
                                    onChange={onChangePublishDate}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationDescription">
                                <Form.Label>Brief Description Book</Form.Label>
                                <Form.Control as="textarea" rows={3} 
                                value={bookDescription}
                                onChange={onChangeDesBook} placeholder="Description"/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            {/* <Form.Group as={Col} md="6" controlId="validationFilePDF">
                            <Form.Label>File PDF</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                placeholder="File PDF"
                                value={PDF}
                                onChange={onChangePDFFile}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a File PDF.
                            </Form.Control.Feedback>
                            </Form.Group> */}
                            <Form.Group as={Col} md="12" controlId="validationCoverBook">
                            <Form.Label>Cover Book</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                placeholder="Cover Book"
                                onChange={onChangeImageCover}
                            />
                            <label className='d-flex justify-content-center'><img style={{ height: "150px", width: "150px" }} src={image} alt='Cover Book'/></label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a Cover Book.
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Back
                    </Button>
                    <Button type="submit" variant="success" onClick={handleSubmit}>
                        Add Book
                </Button>
                </Modal.Footer>
            </Modal>

            <div className="user-address-card my-3 px-2">
                <ButtonCustom title="Add Book" handleShow={handleShow}/>
            </div>
            {
                isPress ? loading ? <Spinner animation="border" variant="primary" /> : <h4>Finished</h4>: null
            }
            <ToastContainer />
        </div>
    )
}

export default AddBook