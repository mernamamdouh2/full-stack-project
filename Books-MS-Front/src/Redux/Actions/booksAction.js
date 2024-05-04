import { ADD_BOOK, DELETE_BOOK, GET_ALL_BOOKS, GET_ALL_YEARS, GET_BOOK_DETAILS, GET_ERROR, UPDATE_BOOK } from '../type'

import useDeleteData from '../../Hooks/useDeleteData';
import { useGetData } from '../../Hooks/useGetData';
import { useInsertDataWithImage } from '../../Hooks/useInsertData';
import { useUpdateDataWithImage } from '../../Hooks/useUpdateData';

//create books with pagination
export const createBook = (formatData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage("/api/v1/books", formatData);
        dispatch({
            type: ADD_BOOK,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error: " + e,
        });
    }
};

//get all books with pagination
export const getAllBooks = () => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/books`);
        dispatch({
            type: GET_ALL_BOOKS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all books with pagination with pages number
export const getAllBooksPage = (page, limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/books?page=${page}&limit=${limit}`);
        dispatch({
            type: GET_ALL_BOOKS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all books with specific Field
export const getAllBooksField = () => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/books?fields=year`);
        dispatch({
            type: GET_ALL_YEARS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all books with query string
export const getAllBooksSearch = (queryString) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/books?${queryString}`);
        dispatch({
            type: GET_ALL_BOOKS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all books with pagination for specific year
export const getAllBooksYear = (year) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/books/${year}`);
        dispatch({
            type: GET_ALL_BOOKS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all books with pagination with pages number for specific year
// export const getAllBooksPageYear = (year, page, limit) => async (dispatch) => {
//     try {
//         const response = await useGetData(`/api/v1/books/${year}?page=${page}&limit=${limit}`);
//         dispatch({
//             type: GET_ALL_BOOKS,
//             payload: response,
//             loading: true
//         })

//     } catch (e) {
//         dispatch({
//             type: GET_ERROR,
//             payload: "Error " + e,
//         })
//     }
// }

//get one book with id
export const getOneBook = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/books/${id}`);
        dispatch({
            type: GET_BOOK_DETAILS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//delete book with id
export const deleteBook = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/books/${id}`);
        dispatch({
            type: DELETE_BOOK,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//update book with id
export const updateBooks = (id, data) => async (dispatch) => {
    try {
        const response = await useUpdateDataWithImage(`/api/v1/books/${id}`, data);
        dispatch({
            type: UPDATE_BOOK,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

