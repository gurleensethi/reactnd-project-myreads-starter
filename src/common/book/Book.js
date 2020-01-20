import React from "react";
import PropTypes from "prop-types";

function Book(props) {
  let { title, authors, imageLinks, shelf, updateBookShelf } = props;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLinks && imageLinks.thumbnail}")`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={event => updateBookShelf(event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors && authors[0]}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  imageLinks: PropTypes.object.isRequired,
  shelf: PropTypes.string,
  updateBookShelf: PropTypes.func.isRequired
};

export default Book;
