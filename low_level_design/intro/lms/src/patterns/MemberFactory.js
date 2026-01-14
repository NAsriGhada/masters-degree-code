import { Member } from "../domain/Member.js";
import { MemberType } from "../domain/enums.js";

export class MemberFactory {
  create({ type, memberId, name, email }) {
    switch (type) {
      case MemberType.STUDENT:
        return new Member({ memberId, name, email, maxBorrowLimit: 3, type });
      case MemberType.TEACHER:
        return new Member({ memberId, name, email, maxBorrowLimit: 5, type });
      default:
        return new Member({
          memberId,
          name,
          email,
          maxBorrowLimit: 3,
          type: "MEMBER",
        });
    }
  }
}
