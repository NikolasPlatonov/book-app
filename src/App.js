import React, { Component } from 'react';
import BookItem from './components/BookItem';
import Details from './components/Details';
import Favorits from './components/Favorits';
import { Grid, Button, Search } from 'semantic-ui-react';
import autoBind from 'react-autobind';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      inputText: '',
      details: null,
    };
    autoBind(this);
  }

  async componentDidMount() {
    const url =
      'https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=AIzaSyCxXHAtjJNDPwzJTqHSdwktZmBcKK0F5B4';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data.items, loading: false });
  }

  detailsOpen = (book, e) => {
    this.setState({
      details: book,
    });
  };

  onChange = (e) => {
    return this.setState({
      inputText: e.target.value,
    });
  };

  // filteredBooks = (data) => {
  //   return data.filter((text) => {
  //     return (
  //       text.volumeInfo.authors[0]
  //         .toLowerCase()
  //         .indexOf(this.state.inputText.toLowerCase()) !== -1 ||
  //       text.volumeInfo.title
  //         .toLowerCase()
  //         .indexOf(this.state.inputText.toLowerCase()) !== -1 ||
  //       text.volumeInfo.publishedDate
  //         .toLowerCase()
  //         .indexOf(this.state.inputText.toLowerCase()) !== -1 ||
  //       null
  //     );
  //   });
  // };

  render() {
    console.log('BOOKS-LIST', this.state.data);
    return (
      <div className="App">
        <Grid row={2} divided>
          <Grid.Row>
            <div className="searchBar">
              <Search
                type="text"
                value={this.state.inputText}
                // onSearchChange={this.onChange}
                open={false}
              />
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid columns={3}>
              <Grid.Column width={3}>
                <div>
                  {this.state.loading || !this.state.data
                    ? 'LOADING...'
                    : this.state.data.map((item, id) => {
                        return (
                          <div key={id} className="item">
                            <Button
                              onClick={(e) => this.detailsOpen(item, e)}
                              className="ui segment"
                            >
                              <BookItem
                                title={item.volumeInfo.title}
                                authors={item.volumeInfo.authors}
                                cover={item.volumeInfo.imageLinks.thumbnail}
                              />
                            </Button>
                          </div>
                        );
                      })}
                </div>
              </Grid.Column>
              <Grid.Column width={10}>
                {this.state.details ? (
                  <Details details={this.state.details} />
                ) : (
                  'Select a book from the list'
                )}
              </Grid.Column>
              <Grid.Column width={3}>FAVORITES</Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
