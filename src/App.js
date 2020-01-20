import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Home from "./home/Home";
import Search from "./search/Search";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
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

  handleUpdateBook = (book, shelf) => {
    // If the book is already on the shelf, no need to
    // send an api request.
    if (book.shelf === shelf) {
      return;
    }

    BooksAPI.update(book, shelf).then(response => {
      this.setState(prevState => {
        const newBooks = { ...prevState.books };
        newBooks[book.shelf] = newBooks[book.shelf].filter(
          b => b.id !== book.id
        );
        if (shelf !== "none") {
          newBooks[shelf] = [...(newBooks[shelf] || []), { ...book, shelf }];
        }
        return { books: newBooks };
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Home
              books={this.state.books}
              updateBookShelf={this.handleUpdateBook}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <Search
              onSearchClose={() => {
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
