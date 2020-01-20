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

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <Home books={this.state.books} />}
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
