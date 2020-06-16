import React from 'react';
import { Grid } from 'semantic-ui-react';

const Details = ({ cover, title, authors, country }) => {
  return (
    <div className="fixed-details">
      <Grid>
        <Grid.Row>
          <div className="common-details">
            <img alt="book_cover" width={128} height={128} src={cover} />
          </div>
        </Grid.Row>
        <Grid.Row>
          <div className="bold-details">{title}</div>
        </Grid.Row>
        <Grid.Row>
          <div className="common-details">{authors}</div>
        </Grid.Row>
        <Grid.Row>
          <div className="common-details">{country}</div>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Details;
