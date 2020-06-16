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

  addToFavorits(e, id) {
    const newFavoritsArr = [];
    if (this.state.favorits.length === 0) {
      newFavoritsArr.push(e);
    }

    this.state.favorits.filter((i) => {
      if (i.id !== id) {
        newFavoritsArr.push(e);
      }
    });

    this.setState({
      favorits: newFavoritsArr,
    });
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
    return (
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
                details={this.state.details}
                addToFavorits={this.addToFavorits}
              />
            ) : (
              'Select a book from the list'
            )}
          </div>
          <div className="favorits_container">
            {this.state.favorits.length !== 0
              ? this.state.favorits.map((item, id) => {
                  return (
                    <div key={id} className="favorits_item">
                      <BookItem
                        title={item.volumeInfo.title}
                        cover={item.volumeInfo.imageLinks.thumbnail}
                      />
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
              : 'Shelf for favorites books'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
