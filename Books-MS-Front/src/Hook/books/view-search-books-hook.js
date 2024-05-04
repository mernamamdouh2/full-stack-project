import { useDispatch, useSelector } from "react-redux";

import { getAllBooksSearch } from '../../Redux/Actions/booksAction';
import { useEffect } from 'react'

const ViewSearchBooksHook = () => {
    let limit = 4;
    const dispatch = useDispatch();
    
    const getBook = async () => {
        getStorage();
        
        await dispatch(getAllBooksSearch(`limit=${limit}&keyword=${word}`))
    }
    useEffect(() => {
        getBook()
    }, [])

    const allBooks = useSelector((state) => state.allBooks.allBooks)
    
    let items = []; 
    let pagination = []; let results = 0;
    try {
        if (allBooks.data)
            items = allBooks.data;
        else
            items = []
    } catch (e) { }
    try {
        if (allBooks.paginationResult){
            if (allBooks.data.length < 4 || allBooks.results < 4)
                {
                    pagination = []
                }
            pagination = allBooks.paginationResult.numberOfPages;
        }
        else{
            pagination = []
        }
    } catch (e) { }
    try {
        if (allBooks.results)
            results = allBooks.results;
        else
            results = 0
    } catch (e) { }

    // when click pagination
    const onPress = async (page) => {
        getStorage();
        await dispatch(getAllBooksSearch(`limit=${limit}&page=${page}&keyword=${word}`))
    }
    
    let word = ""
    const getStorage = () => {
        if (localStorage.getItem("searchWord") != null)
            word = localStorage.getItem("searchWord")
    }
    
    return [items, pagination, onPress, getBook, results]
}

export default ViewSearchBooksHook