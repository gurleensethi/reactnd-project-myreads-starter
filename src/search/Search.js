import React from "react";
import BookList from "../common/book/BookList";
import * as BookAPI from "../BooksAPI";
import PropTypes from "prop-types";

class Search extends React.Component {
  static propTypes = {
    updateBookShelf: PropTypes.func.isRequired,
    onSearchClose: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  };

  state = {
    query: "",
    books: []
  };

  handleQueryChange = event => {
    const { value } = event.target;
    this.setState(() => {
      return { query: value };
    }, this.scheduleSearch);
  };

  scheduleSearch = () => {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchBooks();
    }, 500);
  };

  searchBooks = () => {
    BookAPI.search(this.state.query).then(books => {
      if (Array.isArray(books)) {
        this.setState(prevState => {
          return {
            books: books || []
          };
        });
      } else {
        this.setState(prevState => ({ books: [] }));
      }
    });
  };

  componentWillUnmount = () => {
    clearTimeout(this.searchTimeout);
  };

  render() {
    const { updateBookShelf, onSearchClose } = this.props;
    const books = this.state.books.map(b => {
      const book = this.props.books.find(book => book.id === b.id);
      return { ...b, shelf: book && book.shelf };
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={onSearchClose}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.handleQueryChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookList books={books} updateBookShelf={updateBookShelf} />
        </div>
      </div>
    );
  }
}

export default Search;
