import { Events } from "./events.js";

export class Notifier {
  constructor({ eventBus, sendEmail }) {
    this.eventBus = eventBus;
    this.sendEmail = sendEmail; // injected function (easy to test)
  }

  start() {
    this.unsubOverdue = this.eventBus.on(
      Events.BOOK_OVERDUE,
      async ({ member, book, loanTx }) => {
        await this.sendEmail({
          to: member.email,
          subject: "Library: Overdue book reminder",
          body: `Hi ${member.name},\n\nYour book "${
            book.title
          }" is overdue. Due: ${loanTx.dueDate.toDateString()}\n\nThanks.`,
        });
      }
    );
  }

  stop() {
    this.unsubOverdue?.();
  }
}
