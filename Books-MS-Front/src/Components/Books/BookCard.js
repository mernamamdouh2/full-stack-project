import { Button, Card, Col, Modal } from 'react-bootstrap';

// import ButtonCustom from '../Utility/ButtonCustom';
import React from 'react';
import deleteIcon from "../../Images/delete.png";
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../Redux/Actions/booksAction';

const BookCard = ({ item }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteBook(item._id))
        setShow(false);
        window.location.reload();
    }

    // Check if item.publishDate is defined before splitting
    const date = item.publishDate ? item.publishDate.split('T')[0] : '';

    return (     
        <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title><div>Delete Confirm</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div>Are you sure about deleting the book?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Back
                    </Button>
                    <Button variant="success" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal> 

            <Card
                className="my-2 text-center"
                style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
                }}>
                    <Card.Header className="text-muted d-flex justify-content-between">
                        <small className="d-flex justify-content-start">
                            {date} 
                        </small>
                        <span className="d-flex justify-content-end" onClick={handleShow}>
                            <img style={{ height: "20px", width: "20px", cursor:'pointer' }} src={deleteIcon} alt='deleteIcon'/>
                        </span>
                    </Card.Header>
                    <Card.Img style={{ height: "228px", width: "100%" }} src={item.imageCover} />
                <Card.Body>
                    <Card.Title>
                        <div className="card-title">
                            {item.title} 
                        </div>
                    </Card.Title>
                    <Card.Text>
                        <div className="description">
                            {item.description}
                        </div>
                    </Card.Text>
                    {/* <ButtonCustom title="Download"/> */}
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-center">
                    <small>
                        Authorship By: {item.author}
                    </small>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default BookCard