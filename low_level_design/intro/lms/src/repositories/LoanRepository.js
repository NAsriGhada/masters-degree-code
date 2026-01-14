export class LoanRepository {
  create(tx) {
    throw new Error("LoanRepository.create not implemented");
  }
  findOpenLoan(memberId, bookId) {
    throw new Error("LoanRepository.findOpenLoan not implemented");
  }
  closeLoan(transactionId, returnDate) {
    throw new Error("LoanRepository.closeLoan not implemented");
  }
  countOpenLoansForMember(memberId) {
    throw new Error("LoanRepository.countOpenLoansForMember not implemented");
  }
  findAllOpen() {
    throw new Error("LoanRepository.findAllOpen not implemented");
  } // used by OverdueScanner
}
