import { useDispatch, useSelector } from "react-redux";

import { getAllBooksField } from '../../Redux/Actions/booksAction';
import { useEffect } from 'react'

const ViewFilterYearsBooksHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBooksField())
    }, [])
    
    const allYears = useSelector((state) => state.allBooks.allYears)

    let items = [];
    let uniqueYears = [];
    try {
        if (allYears.data){
            items = allYears.data;
            const years = items.map(item => item.year);
            uniqueYears = [...new Set(years)];
        }
        else
            items = []
    } catch (e) { }

    return [uniqueYears]
}

export default ViewFilterYearsBooksHook
