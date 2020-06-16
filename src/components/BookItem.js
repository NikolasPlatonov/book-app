import React from 'react';
import '../App.css';

const BookItem = ({ title, cover }) => {
  return (
    <div>
      <div>{title}</div>
      <img alt="book_cover" width={40} src={cover} />
    </div>
  );
};

export default BookItem;
