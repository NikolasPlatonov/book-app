import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';

const PaginationComponent = (props) => {
  let pageCount = Math.ceil(props.totalItems / props.booksPerPage);
  let pageNumbers = [];

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((num) => (
        <Button
          active={num === props.currentPage}
          key={num}
          onClick={() => {
            props.paginate(num);
          }}
        >
          {num}
        </Button>
      ))}
    </div>
  );
};

export default PaginationComponent;
