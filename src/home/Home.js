import React from "react";
import BookShelf from "./Bookshelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Home(props) {
  const {
    books: { currentlyReading, wantToRead, read }
  } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently Reading" books={currentlyReading} />
          <BookShelf title="Want to Read" books={wantToRead} />
          <BookShelf title="Currently Reading" books={read} />
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
  books: PropTypes.object.isRequired
};

export default Home;
