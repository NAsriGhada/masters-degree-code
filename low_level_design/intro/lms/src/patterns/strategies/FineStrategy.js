export class FineStrategy {
  // eslint-disable-next-line no-unused-vars
  computeFine({ loanTx, returnedAt }) {
    throw new Error("FineStrategy.computeFine() must be implemented");
  }
}
