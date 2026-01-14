import { LoanRepository } from "../LoanRepository.js";

export class InMemoryLoanRepository extends LoanRepository {
  constructor() {
    super();
    this.byId = new Map();
  }

  create(tx) {
    this.byId.set(tx.transactionId, tx);
  }

  findOpenLoan(memberId, bookId) {
    for (const tx of this.byId.values()) {
      if (tx.memberId === memberId && tx.bookId === bookId && tx.isOpen())
        return tx;
    }
    return null;
  }

  closeLoan(transactionId, returnDate) {
    const tx = this.byId.get(transactionId);
    if (!tx) throw new Error("Transaction not found");
    tx.returnDate = returnDate;
  }

  countOpenLoansForMember(memberId) {
    let count = 0;
    for (const tx of this.byId.values()) {
      if (tx.memberId === memberId && tx.isOpen()) count++;
    }
    return count;
  }

  findAllOpen() {
    return [...this.byId.values()].filter((tx) => tx.isOpen());
  }
}
