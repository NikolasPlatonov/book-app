import React, { Component } from 'react';
import autoBind from 'react-autobind';

import axios from 'axios';
import BookItem from './components/BookItem';
import Pagination from './components/Pagination';
import Details from './components/Details';
import Preloader from './common/Preloader';
import { Form, FormControl, Button } from 'react-bootstrap';
import book_cover from './assets/book_cover.png';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: 'AIzaSyCxXHAtjJNDPwzJTqHSdwktZmBcKK0F5B4',
      data: null,
      searchText: '',
      details: null,
      favorits: [],
      loading: false,
      currentPage: 1,
      booksPerPage: 20,
      startIndex: 0,
      totalItems: null,
    };
    autoBind(this);
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

  handleSubmit() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchText}&key=${this.state.apiKey}&maxResults=${this.state.booksPerPage}&startIndex=${this.state.startIndex}`;
    this.setState({ loading: true });
    axios.get(url).then((responce) => {
      this.setState({
        data: responce.data.items,
        totalItems: responce.data.totalItems,
      });
      this.setState({ loading: false });
    });
  }

  paginate(pageNum) {
    const newStartIndex =
      pageNum * this.state.booksPerPage - this.state.booksPerPage;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchText}&key=${this.state.apiKey}&maxResults=${this.state.booksPerPage}&startIndex=${newStartIndex}`;
    this.setState({ loading: true });
    axios.get(url).then((responce) => {
      this.setState({
        currentPage: pageNum,
        data: responce.data.items,
        totalItems: responce.data.totalItems,
      });
      this.setState({ loading: false });
    });
  }

  render() {
    const {
      data,
      details,
      favorits,
      loading,
      currentPage,
      booksPerPage,
      startIndex,
      totalItems,
    } = this.state;

    if (loading) {
      return (
        <div className="preloader">
          <Preloader />
        </div>
      );
    }

    return (
      <div className="main_container">
        <div className="container">
          <div className="search">
            <Form inline onSubmit={this.handleSubmit}>
              <FormControl
                type="search"
                placeholder="Search..."
                className=" mr-sm-2"
                autoComplete="off"
                onChange={this.handleChange}
              />
              <Button type="submit">Submit</Button>
            </Form>

            <div className="pagination">
              <Pagination
                totalItems={totalItems}
                booksPerPage={booksPerPage}
                paginate={this.paginate}
                startIndex={startIndex}
                currentPage={currentPage}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
          <div className="content">
            <div className="books_list">
              {!data ? (
                <div className="info_text">Shelf for searching books</div>
              ) : (
                data.map((item, id) => {
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
                            item.volumeInfo.imageLinks
                              ? item.volumeInfo.imageLinks.thumbnail
                              : book_cover
                          }
                        />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
            <div className="details">
              {details ? (
                <Details
                  favoritsId={Array.from(favorits, ({ id }) => id)}
                  details={details}
                  addToFavorits={this.addToFavorits}
                />
              ) : (
                <div className="info_text">Select book from the list</div>
              )}
            </div>
            <div className="favorits_container">
              {favorits.length !== 0 ? (
                favorits.map((item, id) => {
                  return (
                    <div key={id} className="book_item">
                      <Button
                        variant="light"
                        onClick={(e) => this.detailsOpen(item, e)}
                      >
                        <BookItem
                          title={item.volumeInfo.title}
                          cover={
                            item.volumeInfo.imageLinks
                              ? item.volumeInfo.imageLinks.thumbnail
                              : book_cover
                          }
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
