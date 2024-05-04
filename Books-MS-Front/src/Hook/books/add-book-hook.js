import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { createBook } from '../../Redux/Actions/booksAction';
import logo from '../../Images/logo.png';
import notify from '../useNotification';

const AddBookHook = () => {
    const dispatch = useDispatch();
    
    //values state
    const [bookTitle, setBookTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [image, setImage] = useState(logo);
    const [selectedFile, setSelectedFile] = useState(null)
    // const [PDF, setPDF] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false)

    //to change Book Name state
    const onChangeBookTitle = (event) => {
        event.persist();
        setBookTitle(event.target.value)
    }
    //to change Author Name state
    const onChangeAuthorName = (event) => {
        event.persist();
        setAuthorName(event.target.value)
    }
    //to change Publish Date state
    const onChangePublishDate = (event) => {
        event.persist();
        setPublishDate(event.target.value)
    } 
    //to change Description Book state
    const onChangeDesBook = (event) => {
        event.persist();
        setBookDescription(event.target.value)
    }
    //when image change save it 
    const onChangeImageCover = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    //to save data 
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (bookTitle === "" || authorName === "" || publishDate === "" || selectedFile === null) {
            notify("Please, Complete Data Entry", "warn")
            return;
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const formData = new FormData();
        formData.append("title", bookTitle);
        formData.append("author", authorName);
        formData.append("publishDate", publishDate);
        formData.append("description", bookDescription);
        formData.append("imageCover", selectedFile);
        // formData.append("pdfFile", PDF);

        setLoading(true)
        setIsPress(true)
        try {
            await dispatch(createBook(formData));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            notify("Error occurred while adding the book", "error");
        }
    }

    //get create message
    const book = useSelector(state => state.allBooks.books)

    useEffect(() => {
        if (!loading && isPress) {
            setBookTitle('')
            setAuthorName('')
            setPublishDate('')
            setBookDescription('')
            setImage(logo)
            setSelectedFile(null)
            setIsPress(false)
            setLoading(true)
            setTimeout(() => setIsPress(false), 1500)
            
            if (book) {
                if (book.status === 201) {
                    notify("Your Book Added Successfully", "success")
                    handleClose()
                    setTimeout(() => window.location.reload(), 1000)
                } else {
                    notify("There's a problem with adding the book", "error")
                }
            }
        }
    }, [loading])

    return [show, loading, isPress, validated, handleClose, handleShow, onChangeBookTitle, onChangeAuthorName, 
        onChangePublishDate, onChangeDesBook, onChangeImageCover, bookTitle, authorName, publishDate,
        bookDescription, image, handleSubmit]
}

export default AddBookHook
