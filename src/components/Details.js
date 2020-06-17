import React from 'react';
import s from './Details.module.css';

const Details = (props) => {
  return (
    <div className={s.container}>
      <div className={s.cover_container}>
        <img
          alt="book_cover"
          src={props.details.volumeInfo.imageLinks.thumbnail}
        />
      </div>
      <div className={s.description_container}>
        <div>
          <div className={s.title}>{props.details.volumeInfo.title}</div>
          <div className={s.common}>{props.details.volumeInfo.authors}</div>
          <div className={s.common}>{props.details.volumeInfo.publisher}</div>
        </div>

        <div>
          <button
            disabled={props.favoritsId.some((id) => id === props.details.id)}
            onClick={() => {
              props.addToFavorits(props.details);
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
