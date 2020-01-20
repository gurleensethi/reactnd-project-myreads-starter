import React from "react";
import BookShelf from "./Bookshelf";
import PropTypes from "prop-types";

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
        <button onClick={() => this.setState({ showSearchPage: true })}>
          Add a book
        </button>
      </div>
    </div>
  );
}

Home.propTypes = {
  books: PropTypes.object.isRequired
};

export default Home;
