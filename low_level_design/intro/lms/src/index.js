import { Book } from "./domain/Book.js";
import { MemberFactory } from "./patterns/MemberFactory.js";
import { MemberType } from "./domain/enums.js";

import { InMemoryBookRepository } from "./repositories/memory/InMemoryBookRepository.js";
import { InMemoryMemberRepository } from "./repositories/memory/InMemoryMemberRepository.js";
import { InMemoryLoanRepository } from "./repositories/memory/InMemoryLoanRepository.js";

import { FlatDailyFineStrategy } from "./patterns/strategies/FlatDailyFineStrategy.js";
import { EventBus } from "./patterns/observer/EventBus.js";
import { Notifier } from "./patterns/observer/Notifier.js";

import { LibraryService } from "./services/LibraryService.js";
import { OverdueScanner } from "./services/OverdueScanner.js";

import { runCli } from "./cli.js";
runCli();

// --- DI container-ish wiring ---
const bookRepo = new InMemoryBookRepository();
const memberRepo = new InMemoryMemberRepository();
const loanRepo = new InMemoryLoanRepository();

const fineStrategy = new FlatDailyFineStrategy({ perDay: 2 });
const eventBus = new EventBus();

const sendEmail = async ({ to, subject, body }) => {
  // Replace with real email provider; kept injectable for testing
  console.log("\n--- EMAIL ---");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log(body);
  console.log("-------------\n");
};

const notifier = new Notifier({ eventBus, sendEmail });
notifier.start();

const libraryService = new LibraryService({
  bookRepo,
  memberRepo,
  loanRepo,
  fineStrategy,
  eventBus,
  loanDays: 14,
});

const overdueScanner = new OverdueScanner({
  loanRepo,
  bookRepo,
  memberRepo,
  eventBus,
});

// --- seed data ---
const factory = new MemberFactory();
const m1 = factory.create({
  type: MemberType.STUDENT,
  memberId: "M-1",
  name: "Ghada",
  email: "ghada@example.com",
});
memberRepo.save(m1);

bookRepo.save(
  new Book({
    bookId: "B-1",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
  })
);

// --- demo flow ---
const { transactionId, dueDate } = libraryService.borrowBook("M-1", "B-1");
console.log("Borrowed tx:", transactionId, "due:", dueDate.toDateString());

// Force overdue scan (simulate future)
overdueScanner.scan(new Date(Date.now() + 20 * 24 * 60 * 60 * 1000));

const result = libraryService.returnBook("M-1", "B-1");
console.log(
  "Returned:",
  result.returnedAt.toDateString(),
  "fine:",
  result.fine
);
