import React, { Component } from 'react';
import BookItem from './components/BookItem';
import Details from './components/Details';
import { Button, Search } from 'semantic-ui-react';
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

  render() {
    console.log('BOOKS-LIST', this.state.data);
    return (
      <div className="container">
        <div className="search">
          <Search
            type="text"
            value={this.state.inputText}
            onSearchChange={this.onChange}
            open={false}
          />
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
              <Details details={this.state.details} />
            ) : (
              'Select a book from the list'
            )}
          </div>
          <div className="favorits"></div>
        </div>
      </div>
    );
  }
}

export default App;
