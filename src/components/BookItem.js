import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../App.css';

const BookItem = ({ title, authors, cover }) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <div className="bold-item">
            {title} &#x2c; {authors}
          </div>
        </Grid.Column>
        <Grid.Column width={8}>
          <img alt="book_cover" width={70} src={cover} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default BookItem;
