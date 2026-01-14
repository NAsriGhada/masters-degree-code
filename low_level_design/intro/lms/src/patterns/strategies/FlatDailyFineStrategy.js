import { FineStrategy } from "./FineStrategy.js";
import { diffDaysCeil } from "../../utils/dates.js";

export class FlatDailyFineStrategy extends FineStrategy {
  constructor({ perDay = 1 } = {}) {
    super();
    this.perDay = perDay;
  }

  computeFine({ loanTx, returnedAt }) {
    if (returnedAt <= loanTx.dueDate) return 0;
    const lateDays = diffDaysCeil(returnedAt, loanTx.dueDate);
    return Math.max(0, lateDays) * this.perDay;
  }
}
