import React from 'react';
import s from './Details.module.css';

const Details = (props) => {
  return (
    <div className={s.container}>
      <div>
        <img
          alt="book_cover"
          src={props.details.volumeInfo.imageLinks.thumbnail}
          width={350}
        />
      </div>
      <div>
        <div className="bold-details">{props.details.volumeInfo.title}</div>
        <div className="common-details">{props.details.volumeInfo.authors}</div>
        <div className="common-details">
          {props.details.volumeInfo.publisher}
        </div>
        <div>
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
