import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };

  render() {
    const { updateBookShelf } = this.props;
    return (
      <ol className="books-grid">
        {this.props.books.map(book => {
          return (
            <Book
              {...book}
              key={book.id}
              updateBookShelf={shelf => updateBookShelf(book, shelf)}
            />
          );
        })}
      </ol>
    );
  }
}

export default BookList;
