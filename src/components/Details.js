import React from 'react';
import s from './Details.module.css';

const Details = (props) => {
  console.log('Details -> props', props);
  return (
    <div className={s.container}>
      <div>
        <img
          alt="book_cover"
          src={props.details.volumeInfo.imageLinks.thumbnail}
        />
      </div>
      <div className="bold-details">{props.details.volumeInfo.title}</div>
      <div className="common-details">{props.details.volumeInfo.authors}</div>
      <div className="common-details">{props.details.volumeInfo.publisher}</div>
    </div>
  );
};

export default Details;
