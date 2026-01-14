import { BookRepository } from "../BookRepository.js";

export class InMemoryBookRepository extends BookRepository {
  constructor() {
    super();
    this.byId = new Map();
  }

  findById(bookId) {
    return this.byId.get(bookId) ?? null;
  }

  save(book) {
    this.byId.set(book.bookId, book);
  }

  search(query) {
    const q = String(query ?? "").toLowerCase();
    return [...this.byId.values()].filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q)
    );
  }
}
