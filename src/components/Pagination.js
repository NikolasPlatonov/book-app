import React from 'react';
import '../App.css';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = (props) => {
  let pageCount = Math.ceil(props.totalItems / props.booksPerPage);
  let pageNumbers = [];

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((num) => (
        <Pagination.Item
          key={num}
          active={num === props.currentPage}
          onClick={() => {
            props.paginate(num);
          }}
        >
          {num}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComponent;
