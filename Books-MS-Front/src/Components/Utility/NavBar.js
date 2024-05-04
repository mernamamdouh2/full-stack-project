import { Container, FormControl, Nav, Navbar } from 'react-bootstrap'

import NavbarSearchHook from '../../Hook/search/navbar-search-hook';
import React  from 'react';
import logo from '../../Images/logo.png'

const NavBar = () => {
    const [OnChangeSearch, searchWord] = NavbarSearchHook()
    
    let word = "";
    if (localStorage.getItem("searchWord") != null)
        word = localStorage.getItem("searchWord")
    
    return (
        <Navbar className="sticky-top" bg="white" variant="white" expand="md"  style={{borderRadius: '10px'}}>
            <Container fluid>
                <Navbar.Brand>
                    <a href='/'>
                        <img src={logo} className='logo' alt='logo'/>
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px'}}
                    >
                        <Nav.Link href="/" style={{ color:'#834e2a' }}>
                            ALL BOOKS
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <FormControl
                    value={word}
                    onChange={OnChangeSearch}
                    type="search"
                    placeholder="Search in My Books"
                    className="me-2 w-75 text-center mx-auto"
                    style={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '10px'
                    }}
                    aria-label="Search"
                    autoComplete='off'
                    autoSave='off'
                />
            </Container>
        </Navbar>
    )
}

export default NavBar
