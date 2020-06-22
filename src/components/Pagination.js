import React from 'react';
import '../App.css';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = (props) => {
  console.log('PaginationComponent -> props', props);
  let pageCount = Math.ceil(props.totalItems / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === pageCount}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination size="sm">
        <Pagination.First />
        <Pagination.Prev />
        {pages}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
