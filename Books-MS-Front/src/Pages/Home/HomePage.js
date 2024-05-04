import { Col, Container, Row } from 'react-bootstrap';

import AddBook from '../../Components/Books/AddBook';
import BooksShelves from '../../Components/Books/BooksShelves';
import FilterBooks from '../../Components/Books/FilterBooks';
import Pagination from '../../Components/Utility/Pagination'
import React from 'react'
import ViewHomeBooksHook from '../../Hook/books/view-home-books-hook';

const HomePage = () => {
  const [items, uniqueYearsArray, pagination, onPress] = ViewHomeBooksHook();
  if (pagination)
      var pageCount = pagination;
  else
      pageCount = 0;

  return (
      <Container>
        <Row className="d-flex justify-content-between pt-2">
          <Col xs="6" className="d-flex justify-content-start">
              <AddBook/>
          </Col>
          <Col xs="6" className="d-flex justify-content-end">
              <FilterBooks uniqueYearsArray={uniqueYearsArray} />
          </Col>
        </Row>
        <Row className='my-2 d-flex justify-content-center' >
          <BooksShelves books={items}/>
        </Row>
        {
          pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress} />) : null
        }
      </Container>
  )
}

export default HomePage
