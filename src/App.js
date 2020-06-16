import React, { Component } from 'react';
import './App.css';
import BookItem from './components/BookItem';
import Details from './components/Details';
import Favorits from './components/Favorits';
import { Grid, Button, Search } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      inputText: null,
    };
  }

  async componentDidMount() {
    const url =
      'https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=AIzaSyCxXHAtjJNDPwzJTqHSdwktZmBcKK0F5B4';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data.items, loading: false });
  }

  render() {
    console.log('BOOKS-LIST', this.state.data);
    return (
      <div className="App">
        <Grid row={2} divided>
          <Grid.Row>
            <div className="searchBar">
              <Search type="text" open={false} />
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid columns={2}>
              <Grid.Column width={3}>
                <div>
                  {this.state.loading || !this.state.data ? (
                    <div>LOADING...</div>
                  ) : (
                    this.state.data.map((item, id) => {
                      return (
                        <div key={id} className="item">
                          <Button className="ui segment">
                            <BookItem
                              title={item.volumeInfo.title}
                              authors={item.volumeInfo.authors}
                              cover={item.volumeInfo.imageLinks.thumbnail}
                            />
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>
              </Grid.Column>
              <Grid.Column width={8}>Details</Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
