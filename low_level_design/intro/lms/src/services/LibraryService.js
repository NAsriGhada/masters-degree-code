import { LoanTransaction } from "../domain/LoanTransaction.js";
import { addDays } from "../utils/dates.js";
import { newId } from "../utils/id.js";
import { Events } from "../patterns/observer/events.js";

export class LibraryService {
  constructor({
    bookRepo,
    memberRepo,
    loanRepo,
    fineStrategy,
    eventBus,
    loanDays = 14,
  }) {
    this.bookRepo = bookRepo;
    this.memberRepo = memberRepo;
    this.loanRepo = loanRepo;
    this.fineStrategy = fineStrategy;
    this.eventBus = eventBus;
    this.loanDays = loanDays;
  }

  addBook(book) {
    this.bookRepo.save(book);
  }

  registerMember(member) {
    this.memberRepo.save(member);
  }

  borrowBook(memberId, bookId) {
    const member = this.memberRepo.findById(memberId);
    if (!member) throw new Error("Member not found");

    const openCount = this.loanRepo.countOpenLoansForMember(memberId);
    if (!member.canBorrow(openCount)) throw new Error("Borrow limit reached");

    const book = this.bookRepo.findById(bookId);
    if (!book) throw new Error("Book not found");
    if (!book.isAvailable()) throw new Error("Book not available");

    const issueDate = new Date();
    const dueDate = addDays(issueDate, this.loanDays);

    const tx = new LoanTransaction({
      transactionId: newId(),
      bookId,
      memberId,
      issueDate,
      dueDate,
      returnDate: null,
    });

    this.loanRepo.create(tx);
    book.markIssued();
    this.bookRepo.save(book);

    this.eventBus?.emit(Events.BOOK_BORROWED, { member, book, loanTx: tx });
    return { transactionId: tx.transactionId, dueDate };
  }

  returnBook(memberId, bookId) {
    const tx = this.loanRepo.findOpenLoan(memberId, bookId);
    if (!tx) throw new Error("No open loan for this member/book");

    const returnedAt = new Date();
    this.loanRepo.closeLoan(tx.transactionId, returnedAt);

    const book = this.bookRepo.findById(bookId);
    if (!book) throw new Error("Book not found");
    book.markReturned();
    this.bookRepo.save(book);

    const fine = this.fineStrategy.computeFine({ loanTx: tx, returnedAt });

    const member = this.memberRepo.findById(memberId);
    this.eventBus?.emit(Events.BOOK_RETURNED, {
      member,
      book,
      loanTx: tx,
      fine,
    });

    return { returnedAt, fine };
  }
}
