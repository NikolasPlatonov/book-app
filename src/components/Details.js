import React from 'react';
import s from './Details.module.css';
import { Button } from 'react-bootstrap';

const Details = (props) => {
  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.cover_container}>
          <a href={props.details.volumeInfo.previewLink} target="_blank">
            <img
              alt="book_cover"
              src={props.details.volumeInfo.imageLinks.thumbnail}
            />
          </a>
        </div>
        <div className={s.description_container}>
          <div>
            <div className={s.title}>{props.details.volumeInfo.title}</div>
            <div className={s.common}>{props.details.volumeInfo.authors}</div>
            <div className={s.common}>{props.details.volumeInfo.publisher}</div>
          </div>

          <div>
            {props.details.saleInfo.saleability === 'FOR_SALE' ? (
              <div>
                <div className={s.common}>
                  {props.details.saleInfo.listPrice.amount}
                  {props.details.saleInfo.listPrice.currencyCode}
                </div>
                <a href={props.details.saleInfo.buyLink} target="_blank">
                  <Button variant="info">Buy now</Button>
                </a>
              </div>
            ) : (
              <div className={s.warning}>
                {props.details.saleInfo.saleability}
              </div>
            )}
          </div>

          <div>
            <Button
              variant="success"
              disabled={props.favoritsId.some((id) => id === props.details.id)}
              onClick={() => {
                props.addToFavorits(props.details);
              }}
            >
              ADD TO FAVORITS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
