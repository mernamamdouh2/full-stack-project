import { ADD_BOOK, DELETE_BOOK, GET_ALL_BOOKS, GET_ALL_YEARS, GET_BOOK_DETAILS, GET_ERROR, UPDATE_BOOK } from '../type'

const initial = {
    books: [],
    allBooks: [],
    allYears: [],
    oneBook: [],
    deleteBook: [],
    updateBook: [],
    loading: true,
}

const booksReducer = (state = initial, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return {
                ...state,
                books: action.payload,
                loading: false,
            }
        case GET_ALL_BOOKS:
            return {
                ...state,
                allBooks: action.payload,
                loading: false,
            }
        case GET_ALL_YEARS:
            return {
                allYears: action.payload,
                loading: false,
            }
        case GET_BOOK_DETAILS:
            return {
                oneBook: action.payload,
                loading: false,
            }
        case UPDATE_BOOK:
            return {
                ...state,
                updateBook: action.payload,
                loading: false,
            }
        case DELETE_BOOK:
            return {
                ...state,
                deleteBook: action.payload,
                loading: false,
            }
        case GET_ERROR:
            return {
                loading: true,
                books: action.payload,
            }
        default:
            return state;
    }
}
export default booksReducer