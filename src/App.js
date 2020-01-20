import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Home from "./home/Home";
import Search from "./search/Search";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => {
        return { books };
      });
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
        let books = prevState.books.filter(b => b.id !== book.id);
        if (shelf !== "none") {
          const newBook = { ...book, shelf };
          books.push(newBook);
        }        
        return { books };
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
              books={this.state.books}
              updateBookShelf={this.handleUpdateBook}
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
