import React from 'react';
import '../App.css';
import s from './BookItem.module.css';

const BookItem = ({ title, cover }) => {
  return (
    <div className={s.container}>
      <div className={s.cover}>
        <img alt="book_cover" src={cover} />
      </div>
      <div className={s.title}>{title}</div>
    </div>
  );
};

export default BookItem;
