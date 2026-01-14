import { assertNonEmpty, assertNumber } from "../utils/assert.js";

export class Member {
  constructor({ memberId, name, email, maxBorrowLimit = 3, type = "MEMBER" }) {
    assertNonEmpty(memberId, "memberId");
    assertNonEmpty(name, "name");
    assertNonEmpty(email, "email");
    assertNumber(maxBorrowLimit, "maxBorrowLimit");

    this.memberId = memberId;
    this.name = name;
    this.email = email;
    this.maxBorrowLimit = maxBorrowLimit;
    this.type = type;
  }

  canBorrow(openLoansCount) {
    return openLoansCount < this.maxBorrowLimit;
  }
}
