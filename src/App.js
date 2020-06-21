import React, { Component } from 'react';
import autoBind from 'react-autobind';

import BookItem from './components/BookItem';
import Details from './components/Details';
import Preloader from './common/Preloader';
import { Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      searchText: '',
      details: null,
      favorits: [],
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

  detailsOpen(book) {
    this.setState({
      details: book,
    });
  }

  onChange(e) {
    this.setState({
      searchText: e.target.value.substr(0, 15),
    });
  }

  addToFavorits(book) {
    const favoritsBooks = [];

    if (this.state.favorits.length === 0) {
      favoritsBooks.push(book);
      this.setState({
        favorits: favoritsBooks,
      });
    } else {
      this.setState({
        favorits: [...this.state.favorits, book],
      });
    }
  }

  deleteFromFavorits(id) {
    const updatedFavorits = this.state.favorits.filter((i) => i.id !== id);
    this.setState({
      favorits: updatedFavorits,
    });
  }

  filteredData(data) {
    return data.filter((text) => {
      return (
        text.volumeInfo.title
          .toLowerCase()
          .indexOf(this.state.searchText.toLowerCase()) !== -1 ||
        text.volumeInfo.authors[0]
          .toLowerCase()
          .indexOf(this.state.searchText.toLowerCase()) !== -1
      );
    });
  }

  render() {
    return (
      <div className="main_container">
        <div className="container">
          <div className="search">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search fro Books"
                className=" mr-sm-2"
                autoComplete="off"
              />
              <Button type="submit">Submit</Button>
            </Form>
          </div>

          <div className="content">
            <div className="books_list">
              {this.state.loading || !this.state.data ? (
                <div className="preloader">
                  <Preloader />
                </div>
              ) : (
                this.filteredData(this.state.data).map((item, id) => {
                  return (
                    <div key={id}>
                      <button onClick={(e) => this.detailsOpen(item, e)}>
                        <BookItem
                          title={item.volumeInfo.title}
                          authors={item.volumeInfo.authors}
                          cover={item.volumeInfo.imageLinks.thumbnail}
                        />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
            <div className="details">
              {this.state.details ? (
                <Details
                  favoritsId={Array.from(this.state.favorits, ({ id }) => id)}
                  details={this.state.details}
                  addToFavorits={this.addToFavorits}
                />
              ) : (
                <div className="info_text">Select book from the list</div>
              )}
            </div>
            <div className="favorits_container">
              {this.state.favorits.length !== 0 ? (
                this.state.favorits.map((item, id) => {
                  return (
                    <div key={id}>
                      <button onClick={(e) => this.detailsOpen(item, e)}>
                        <BookItem
                          title={item.volumeInfo.title}
                          cover={item.volumeInfo.imageLinks.thumbnail}
                        />
                      </button>
                      <button
                        onClick={() => {
                          this.deleteFromFavorits(item.id);
                        }}
                      >
                        Delete from favorits
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="info_text">Shelf for favorites books</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
