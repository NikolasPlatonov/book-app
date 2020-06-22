import React from 'react';
import '../App.css';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = () => {
  return (
    <div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item disabled>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
