import { Events } from "../patterns/observer/events.js";

export class OverdueScanner {
  constructor({ loanRepo, bookRepo, memberRepo, eventBus }) {
    this.loanRepo = loanRepo;
    this.bookRepo = bookRepo;
    this.memberRepo = memberRepo;
    this.eventBus = eventBus;
  }

  scan(now = new Date()) {
    const openLoans = this.loanRepo.findAllOpen();
    for (const tx of openLoans) {
      if (!tx.isOverdue(now)) continue;

      const member = this.memberRepo.findById(tx.memberId);
      const book = this.bookRepo.findById(tx.bookId);
      if (!member || !book) continue;

      this.eventBus.emit(Events.BOOK_OVERDUE, { member, book, loanTx: tx });
    }
  }
}
