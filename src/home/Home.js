import React from "react";
import BookShelf from "./Bookshelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Home(props) {
  const { books, updateBookShelf } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            books={books}
            updateBookShelf={updateBookShelf}
            shelf="currentlyReading"
          />
          <BookShelf
            title="Want to Read"
            books={books}
            updateBookShelf={updateBookShelf}
            shelf="wantToRead"
          />
          <BookShelf
            title="Currently Reading"
            books={books}
            updateBookShelf={updateBookShelf}
            shelf="read"
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  books: PropTypes.array.isRequired
};

export default Home;
