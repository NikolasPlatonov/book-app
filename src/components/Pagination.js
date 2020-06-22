import React from 'react';
import '../App.css';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = (props) => {
  console.log('PaginationComponent -> props', props);
  let pageCount = Math.ceil(props.totalItems / props.booksPerPage);
  let pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === pageCount}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination size="sm"></Pagination>
    </div>
  );
};

export default PaginationComponent;
