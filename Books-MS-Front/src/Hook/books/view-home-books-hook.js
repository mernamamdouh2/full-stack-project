import { getAllBooks, getAllBooksPage } from '../../Redux/Actions/booksAction';
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from 'react'

const ViewHomeBooksHook = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBooks())
    }, [])

    const onPress = async (page) => {
        await dispatch(getAllBooksPage(page, 4))
    }
    
    let items = []; 
    let pagination = [];
    const allBooks = useSelector((state) => state.allBooks.allBooks)
    
    let uniqueYearsArray = [];

    try {
        if (allBooks.data){
            items = allBooks.data
            const uniqueYears = new Set();
            // Iterate through items and add unique years to the set
            items.forEach(item => {
                uniqueYears.add(item.year);
            });
            // Convert the set back to an array
            uniqueYearsArray = Array.from(uniqueYears);
        }
        else
            items = []

            if (allBooks.paginationResult){
                pagination = allBooks.paginationResult.numberOfPages;
            }
            else{
                pagination = []
            }
    } catch (e) { }
    
    return [items, uniqueYearsArray, pagination, onPress]
}

export default ViewHomeBooksHook