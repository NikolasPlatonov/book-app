import React, { Component } from 'react';
import autoBind from 'react-autobind';

import BookItem from './components/BookItem';
import Pagination from './components/Pagination';
import Details from './components/Details';
import Preloader from './common/Preloader';
import { Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: 'AIzaSyCxXHAtjJNDPwzJTqHSdwktZmBcKK0F5B4',
      loading: true,
      data: null,
      searchText: '',
      details: null,
      favorits: [],
      totalItems: null,
      pageSize: 20,
    };
    autoBind(this);
  }

  async componentDidMount() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=javascript&key=${this.state.apiKey}&maxResults=${this.state.pageSize}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('GET_DATA', data);
    this.setState({
      data: data.items,
      loading: false,
      totalItems: data.totalItems,
    });
  }

  detailsOpen(book) {
    this.setState({
      details: book,
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

  handleChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchText}&key=${this.state.apiKey}`;

    axios.get(url).then((data) => {
      console.log('DATA', data);
      this.setState({
        data: data.data.items,
        loading: false,
      });
    });
  }

  render() {
    console.log('DATA', this.state.data);
    console.log('SEARCH_TEXT', this.state.searchText);
    return (
      <div className="main_container">
        <div className="container">
          <div className="search">
            <Form inline onSubmit={this.handleSubmit}>
              <FormControl
                type="search"
                placeholder="Search fro Books"
                className=" mr-sm-2"
                autoComplete="off"
                onChange={this.handleChange}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div className="pagination">
              <Pagination
                totalItems={this.state.totalItems}
                pageSize={this.state.pageSize}
              />
            </div>
          </div>

          <div className="content">
            <div className="books_list">
              {!this.state.data ? (
                <div className="info_text">Shelf for searching books</div>
              ) : (
                this.state.data.map((item, id) => {
                  return (
                    <div key={id} className="book_item">
                      <Button
                        variant="light"
                        onClick={(e) => this.detailsOpen(item, e)}
                      >
                        <BookItem
                          title={item.volumeInfo.title}
                          authors={item.volumeInfo.authors}
                          cover={
                            !item.volumeInfo.imageLinks.thumbnail
                              ? 'Without cover'
                              : item.volumeInfo.imageLinks.thumbnail
                          }
                        />
                      </Button>
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
                    <div key={id} className="book_item">
                      <Button
                        variant="light"
                        onClick={(e) => this.detailsOpen(item, e)}
                      >
                        <BookItem
                          title={item.volumeInfo.title}
                          cover={item.volumeInfo.imageLinks.thumbnail}
                        />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          this.deleteFromFavorits(item.id);
                        }}
                      >
                        <div className="delete_btn">Delete from favorits</div>
                      </Button>
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
