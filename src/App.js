import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Home from "./home/Home";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => {
        /* 
        Segregates the list into 3 different categories using
        the 'shelf' property of a book and creates the following
        structure:
        {
          "currentlyReading": [...],
          "wantToRead": [...],
          "read": [...]
        }   
        */

        return data.reduce((prev, current) => {
          prev[current.shelf] = prev[current.shelf]
            ? prev[current.shelf].concat([current])
            : [current];
          return prev;
        }, {});
      })
      .then(books => {
        this.setState(() => ({ books }));
      });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <Home books={this.state.books} />
        )}
      </div>
    );
  }
}

export default BooksApp;
