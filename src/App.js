import React, { Component } from 'react';
import BookItem from './components/BookItem';
import Details from './components/Details';
import autoBind from 'react-autobind';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      inputText: '',
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

  detailsOpen(book, e) {
    this.setState({
      details: book,
    });
  }

  onChange(e) {
    this.setState({
      inputText: e.target.value,
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

  render() {
    console.log('BOOKS-LIST', this.state.data);
    console.log('FAVORITS', this.state.favorits);
    console.log('ID', this.state.favoritsId);
    return (
      <div className="main_container">
        <div className="container">
          <div className="search">
            <input
              type="text"
              value={this.state.inputText}
              onChange={this.onChange}
              open={false}
            />
            <button>Search</button>
          </div>
          <div className="content">
            <div className="books_list">
              {this.state.loading || !this.state.data
                ? 'LOADING...'
                : this.state.data.map((item, id) => {
                    return (
                      <div key={id} className="item">
                        <button onClick={(e) => this.detailsOpen(item, e)}>
                          <BookItem
                            title={item.volumeInfo.title}
                            authors={item.volumeInfo.authors}
                            cover={item.volumeInfo.imageLinks.thumbnail}
                          />
                        </button>
                      </div>
                    );
                  })}
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
