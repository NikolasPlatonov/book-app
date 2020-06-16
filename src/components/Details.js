import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import '../App.css';

const Details = (props) => {
  console.log('Details -> props', props);
  return (
    <div className="fixed-details">
      <Grid>
        <Grid.Row>
          <div className="common-details">
            <Image
              alt="book_cover"
              width={100}
              height={100}
              src={props.details.volumeInfo.imageLinks.thumbnail}
            />
          </div>
        </Grid.Row>
        <Grid.Row>
          <div className="bold-details">{props.details.volumeInfo.title}</div>
        </Grid.Row>
        <Grid.Row>
          <div className="common-details">
            {props.details.volumeInfo.authors}
          </div>
        </Grid.Row>
        <Grid.Row>
          <div className="common-details">
            {props.details.volumeInfo.publisher}
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Details;
