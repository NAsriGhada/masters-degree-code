import { assertNonEmpty } from "../utils/assert.js";

export class LoanTransaction {
  constructor({
    transactionId,
    bookId,
    memberId,
    issueDate,
    dueDate,
    returnDate = null,
  }) {
    assertNonEmpty(transactionId, "transactionId");
    assertNonEmpty(bookId, "bookId");
    assertNonEmpty(memberId, "memberId");

    this.transactionId = transactionId;
    this.bookId = bookId;
    this.memberId = memberId;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
  }

  isOpen() {
    return this.returnDate == null;
  }

  isOverdue(now = new Date()) {
    return this.isOpen() && now > this.dueDate;
  }
}
