import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => {
          return <Book {...book} key={book.id} />;
        })}
      </ol>
    );
  }
}

export default BookList;
