import React from "react";
import BookList from "../common/book/BookList";
import PropTypes from "prop-types";

function BookShelf(props) {
  const { title, books, updateBookShelf, shelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books && books.length ? (
          <BookList
            books={books.filter(b => b.shelf === shelf)}
            updateBookShelf={updateBookShelf}
          />
        ) : (
          <p>No books on this shelf...</p>
        )}
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  updateBookShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired
};

export default BookShelf;
