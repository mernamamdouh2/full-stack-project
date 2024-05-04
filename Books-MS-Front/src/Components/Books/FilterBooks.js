import { Dropdown, Form } from 'react-bootstrap';
import React, { useState } from 'react'

import ViewFilterYearsBooksHook from '../../Hook/books/view-filter-years-books-hook';
import { getAllBooksYear } from '../../Redux/Actions/booksAction';
import { useDispatch } from 'react-redux';

const FilterBooks = ({uniqueYearsArray}) => {
    const [filterValue, setFilterValue] = useState('');
    const [uniqueYears] = ViewFilterYearsBooksHook();

    const dispatch = useDispatch();

    const onSelectYear = async (selectedYear) => {
        //when select category store id
        await dispatch(getAllBooksYear(selectedYear))
    };

    const filteredYears = uniqueYears.filter(year => {
        // Convert year to a string for comparison
        const yearString = year.toString();
        // Convert filterValue to a string for comparison
        const filterValueString = filterValue.toString();
        // Check if the year string contains the filter value string
        return yearString.includes(filterValueString);
    });

    const dropdownItems = filteredYears.sort((a, b) => b - a).map((year, index) => (
        <Dropdown.Item key={index} onClick={() => onSelectYear(year)}>
            {uniqueYearsArray ? year : []}
        </Dropdown.Item>
    ));

    return (
        <div>
            <div className="d-flex justify-content-between pt-3 px-2 my-3">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" style={{ background: '#834e2a', border: 'none' }}>
                        Filter By Year
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='text-center'>
                        <Form.Control
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setFilterValue(e.target.value)}
                        value={filterValue}
                        />
                        {dropdownItems}
                    </Dropdown.Menu>
                </Dropdown>
            </div> 
        </div>
    )
}

export default FilterBooks
