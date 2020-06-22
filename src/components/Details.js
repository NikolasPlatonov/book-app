import React from 'react';
import s from './Details.module.css';
import { Button } from 'react-bootstrap';
import book_cover from './../assets/book_cover.png';

const Details = (props) => {
  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.cover_container}>
          <a
            href={props.details.accessInfo.webReaderLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.details.volumeInfo.imageLinks ? (
              <img
                alt="book_cover"
                src={props.details.volumeInfo.imageLinks.thumbnail}
              />
            ) : (
              <img alt="book_cover" src={book_cover} />
            )}
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
                <div className={s.price}>
                  {props.details.saleInfo.listPrice.amount}&nbsp;
                  {props.details.saleInfo.listPrice.currencyCode}
                </div>
                <div className={s.add_btn}>
                  <a
                    href={props.details.saleInfo.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="info">Buy now</Button>
                  </a>
                </div>
              </div>
            ) : (
              <div className={s.warning}>
                {props.details.saleInfo.saleability}
              </div>
            )}
          </div>

          <div className={s.add_btn}>
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
