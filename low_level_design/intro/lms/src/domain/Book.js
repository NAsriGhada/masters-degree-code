import { BookStatus } from "./enums.js";
import { assertNonEmpty } from "../utils/assert.js";

export class Book {
  constructor({ bookId, title, author, isbn, status = BookStatus.AVAILABLE }) {
    assertNonEmpty(bookId, "bookId");
    assertNonEmpty(title, "title");
    assertNonEmpty(author, "author");
    assertNonEmpty(isbn, "isbn");

    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = status;
  }

  isAvailable() {
    return this.status === BookStatus.AVAILABLE;
  }

  markIssued() {
    this.status = BookStatus.ISSUED;
  }

  markReturned() {
    this.status = BookStatus.AVAILABLE;
  }
}
