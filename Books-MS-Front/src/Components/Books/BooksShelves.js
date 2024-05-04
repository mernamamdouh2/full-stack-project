import { Container, Row } from 'react-bootstrap';

import BookCard from './BookCard';
import React from 'react'
import Shelf from './Shelf';

const BooksShelves = ({ books }) => {
    // const calculateCardsPerRow = () => {
    //     const screenWidth = window.innerWidth;
    
    //     // Define breakpoints and corresponding number of cards per row
    //     const breakpoints = [
    //         { width: 576, cardsPerRow: 1 },  // Small devices (576px and below): 1 card per row
    //         { width: 768, cardsPerRow: 2 },  // Medium devices (between 576px and 768px): 2 cards per row
    //         { width: 992, cardsPerRow: 3 },  // Large devices (between 768px and 992px): 3 cards per row
    //         { width: 1200, cardsPerRow: 4 }, // Extra large devices (between 992px and 1200px): 4 cards per row
    //         { width: Infinity, cardsPerRow: 5 } // Larger than 1200px: 5 cards per row (or any other value you prefer)
    //     ];
    
    //     // Find the appropriate number of cards per row based on the screen width
    //     const { cardsPerRow } = breakpoints.find(({ width }) => screenWidth < width) || breakpoints[breakpoints.length - 1];
    
    //     return cardsPerRow;
    // };
    // const cardsPerRow = calculateCardsPerRow();
    return (
        <Container>
            <Row className='my-2 d-flex justify-content-center'>
                {
                    books ? (
                        books.map((item, index) => 
                            <React.Fragment key={index}>
                                <BookCard item={item} />
                                {(index + 1) % 4 === 0 && <Shelf />}
                            </React.Fragment>
                        )  
                    ) : <h4>No Books Here</h4>
                }
            </Row>
        </Container>
    )
}

export default BooksShelves