import React from "react";
import BookList from "../common/book/BookList";
import PropTypes from "prop-types";

function BookShelf(props) {
  const { title, books } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BookList books={books} />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};

export default BookShelf;
