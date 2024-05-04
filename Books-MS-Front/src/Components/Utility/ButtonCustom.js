import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const ButtonCustom = ({title, handleShow}) => {
    const [allBooksHovered, setAllBooksHovered] = useState(false);
    
    const handleAllBooksHover = () => {
        setAllBooksHovered(true);
    };
    const handleAllBooksLeave = () => {
        setAllBooksHovered(false);
    };

    return (
       <div className="d-flex mx-2">
            <Button className='mx-auto' onClick={handleShow} 
                style={{ 
                    backgroundColor: allBooksHovered ? '#834e2a' : '#b99c7d', 
                    border: 'none'
                }}
                onMouseEnter={handleAllBooksHover}
                onMouseLeave={handleAllBooksLeave}
            >{title}</Button>
        </div>
    )
}

export default ButtonCustom
