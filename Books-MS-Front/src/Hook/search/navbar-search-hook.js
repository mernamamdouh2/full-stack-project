import { useEffect, useState } from 'react'

import ViewSearchBooksHook from './../books/view-search-books-hook';

const NavbarSearchHook = () => {
    const [items, pagination, onPress, getBook] = ViewSearchBooksHook();

    const [searchWord, setSearchWord] = useState('')

    //when user type search word
    const OnChangeSearch = (e) => {
        localStorage.setItem("searchWord", e.target.value)
        setSearchWord(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            getBook();
        }, 1000);
    }, [searchWord])
    return [OnChangeSearch, searchWord]
}

export default NavbarSearchHook