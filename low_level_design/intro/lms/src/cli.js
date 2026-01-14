// src/cli.js
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

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

// --------- DI wiring (same pattern as before) ----------
const bookRepo = new InMemoryBookRepository();
const memberRepo = new InMemoryMemberRepository();
const loanRepo = new InMemoryLoanRepository();

const fineStrategy = new FlatDailyFineStrategy({ perDay: 2 });
const eventBus = new EventBus();

const sendEmail = async ({ to, subject, body }) => {
  // In CLI we just print to console; still injected => testable
  console.log("\n--- NOTIFICATION (mock email) ---");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log(body);
  console.log("--------------------------------\n");
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

// --------- Seed demo data ----------
const factory = new MemberFactory();
memberRepo.save(
  factory.create({
    type: MemberType.STUDENT,
    memberId: "M-1",
    name: "Ghada",
    email: "ghada@example.com",
  })
);

bookRepo.save(
  new Book({
    bookId: "B-1",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
  })
);
bookRepo.save(
  new Book({
    bookId: "B-2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "9780201616224",
  })
);
bookRepo.save(
  new Book({
    bookId: "B-3",
    title: "Design Patterns",
    author: "GoF",
    isbn: "9780201633610",
  })
);

// --------- CLI helpers ----------
const rl = readline.createInterface({ input, output });

function printMenu() {
  console.log("\n==============================");
  console.log(" Library Management System CLI");
  console.log("==============================");
  console.log("1) Search books");
  console.log("2) Borrow (issue) a book");
  console.log("3) Return a book");
  console.log("4) View my open loans");
  console.log("5) Run overdue scan (demo)");
  console.log("6) Exit");
}

function printBooks(books) {
  if (!books.length) {
    console.log("No books found.");
    return;
  }
  console.log("\nResults:");
  for (const b of books) {
    console.log(
      `- ${b.bookId} | ${b.title} — ${b.author} | ISBN: ${b.isbn} | ${b.status}`
    );
  }
}

function printLoan(tx, book) {
  console.log(
    `- TX:${tx.transactionId} | Book:${book?.title ?? tx.bookId} (${
      tx.bookId
    }) | Due: ${tx.dueDate.toDateString()} | Open: ${tx.isOpen()}`
  );
}

// Adds a tiny "interface-like" helper to list open loans (works with current InMemoryLoanRepository)
function getOpenLoansForMember(memberId) {
  const allOpen = loanRepo.findAllOpen();
  return allOpen.filter((tx) => tx.memberId === memberId);
}

async function promptMemberId(defaultId = "M-1") {
  const val = (await rl.question(`Member ID [default ${defaultId}]: `)).trim();
  return val || defaultId;
}

// --------- Actions ----------
async function actionSearch() {
  const q = (await rl.question("Search query (title/author/isbn): ")).trim();
  const results = bookRepo.search(q);
  printBooks(results);
}

async function actionBorrow() {
  const memberId = await promptMemberId("M-1");
  const bookId = (await rl.question("Book ID to borrow (e.g., B-1): ")).trim();

  try {
    const { transactionId, dueDate } = libraryService.borrowBook(
      memberId,
      bookId
    );
    console.log(
      `✅ Borrowed successfully. TX=${transactionId}, Due=${dueDate.toDateString()}`
    );
  } catch (err) {
    console.log(`❌ Borrow failed: ${err.message}`);
  }
}

async function actionReturn() {
  const memberId = await promptMemberId("M-1");
  const bookId = (await rl.question("Book ID to return (e.g., B-1): ")).trim();

  try {
    const { returnedAt, fine } = libraryService.returnBook(memberId, bookId);
    console.log(
      `✅ Returned successfully on ${returnedAt.toDateString()}. Fine: ${fine}`
    );
  } catch (err) {
    console.log(`❌ Return failed: ${err.message}`);
  }
}

async function actionViewLoans() {
  const memberId = await promptMemberId("M-1");
  const openLoans = getOpenLoansForMember(memberId);

  if (!openLoans.length) {
    console.log("No open loans.");
    return;
  }

  console.log("\nOpen loans:");
  for (const tx of openLoans) {
    const book = bookRepo.findById(tx.bookId);
    printLoan(tx, book);
  }
}

async function actionOverdueScan() {
  const days = (
    await rl.question("Scan as if today is +N days in future (e.g., 20): ")
  ).trim();
  const n = Number(days || "0");
  const now = new Date(Date.now() + n * 24 * 60 * 60 * 1000);

  overdueScanner.scan(now);
  console.log(
    `✅ Overdue scan completed using simulated date: ${now.toDateString()}`
  );
}

// --------- Main loop ----------
export async function runCli() {
  console.log("Welcome! (Demo member: M-1, Books: B-1..B-3)");

  while (true) {
    printMenu();
    const choice = (await rl.question("\nChoose an option (1-6): ")).trim();

    if (choice === "1") await actionSearch();
    else if (choice === "2") await actionBorrow();
    else if (choice === "3") await actionReturn();
    else if (choice === "4") await actionViewLoans();
    else if (choice === "5") await actionOverdueScan();
    else if (choice === "6") break;
    else console.log("Invalid option. Please choose 1-6.");
  }

  notifier.stop();
  rl.close();
  console.log("Bye 👋");
}
