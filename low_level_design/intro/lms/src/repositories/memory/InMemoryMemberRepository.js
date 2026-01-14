import { MemberRepository } from "../MemberRepository.js";

export class InMemoryMemberRepository extends MemberRepository {
  constructor() {
    super();
    this.byId = new Map();
  }

  findById(memberId) {
    return this.byId.get(memberId) ?? null;
  }

  save(member) {
    this.byId.set(member.memberId, member);
  }
}
