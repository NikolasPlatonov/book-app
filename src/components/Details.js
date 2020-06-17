import React from 'react';
import s from './Details.module.css';

const Details = (props) => {
  return (
    <div className={s.container}>
      <div className={s.cover_container}>
        <img
          alt="book_cover"
          src={props.details.volumeInfo.imageLinks.thumbnail}
          width={350}
        />
      </div>
      <div className={s.description_container}>
        <div>
          <div className={s.title}>{props.details.volumeInfo.title}</div>
          <div className={s.common}>{props.details.volumeInfo.authors}</div>
          <div className={s.common}>{props.details.volumeInfo.publisher}</div>
        </div>

        <div className={s.btn}>
          <button
            onClick={() => {
              props.addToFavorits(props.details, props.details.id);
            }}
          >
            ADD TO FAVORITS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
