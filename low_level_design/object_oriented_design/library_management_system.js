/* =========================
   SUBSYSTEM: User Management
   - User (base/abstract-ish)
   - Student, Teacher
   - Factory Pattern (UserFactory)
   - Observer Pattern (User implements update())
========================= */

class User {
  constructor(id, name) {
    if (new.target === User) {
      throw new Error("User is abstract and cannot be instantiated directly.");
    }
    this.id = id;
    this.name = name;
    this.notifications = [];
  }

  // Observer "update" method
  update(message) {
    this.notifications.push(message);
    console.log(`[NOTIFY ${this.name}] ${message}`);
  }

  getType() {
    throw new Error("getType() must be implemented by subclasses.");
  }
}

class Student extends User {
  constructor(id, name) {
    super(id, name);
    this.maxBorrowLimit = 3;
  }
  getType() {
    return "Student";
  }
}

class Teacher extends User {
  constructor(id, name) {
    super(id, name);
    this.maxBorrowLimit = 5;
  }
  getType() {
    return "Teacher";
  }
}

// Factory Pattern
class UserFactory {
  static createUser(type, id, name) {
    switch (type) {
      case "student":
        return new Student(id, name);
      case "teacher":
        return new Teacher(id, name);
      default:
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}

/* =========================
   SUBSYSTEM: Book Management
   - Book class
========================= */

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }
}

/* =========================
   SUBSYSTEM: Borrowing System
   - BorrowTransaction
   - NotificationService (Observer Subject)
========================= */

class BorrowTransaction {
  constructor({ id, userId, bookId, borrowDate, dueDate }) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.borrowDate = borrowDate;
    this.dueDate = dueDate;

    // Simulated overdue flag (can be updated by system checks)
    this.isOverdue = false;

    this.returnDate = null;
    this.isReturned = false;
  }

  markReturned(date = new Date()) {
    this.isReturned = true;
    this.returnDate = date;
    this.isOverdue = false;
  }

  checkOverdue(today = new Date()) {
    if (this.isReturned) return false;
    const overdueNow = today > this.dueDate;
    this.isOverdue = overdueNow;
    return overdueNow;
  }
}

// Observer Subject
class NotificationService {
  constructor() {
    this.subscribers = new Map(); // userId -> User
  }

  subscribe(user) {
    this.subscribers.set(user.id, user);
  }

  unsubscribe(userId) {
    this.subscribers.delete(userId);
  }

  notifyUser(userId, message) {
    const user = this.subscribers.get(userId);
    if (user) user.update(message);
  }
}

/* =========================
   MAIN: LibrarySystem (Singleton)
   - Coordinates all subsystems
   - Stores users, books, transactions
========================= */

class LibrarySystem {
  static #instance = null;

  static getInstance() {
    if (!LibrarySystem.#instance) {
      LibrarySystem.#instance = new LibrarySystem();
    }
    return LibrarySystem.#instance;
  }

  constructor() {
    if (LibrarySystem.#instance) {
      throw new Error(
        "Use LibrarySystem.getInstance() to access the Singleton."
      );
    }

    // Collections
    this.users = new Map(); // userId -> User
    this.books = new Map(); // bookId -> Book
    this.transactions = new Map(); // transactionId -> BorrowTransaction

    // Optional Observer system
    this.notificationService = new NotificationService();

    // Simple counters for IDs
    this.transactionCounter = 1;
  }

  /* -------- User Management -------- */

  addUser(user) {
    if (this.users.has(user.id)) {
      throw new Error(`User with id "${user.id}" already exists.`);
    }
    this.users.set(user.id, user);

    // Register for notifications (Observer)
    this.notificationService.subscribe(user);
  }

  getUser(userId) {
    const user = this.users.get(userId);
    if (!user) throw new Error(`User with id "${userId}" not found.`);
    return user;
  }

  /* -------- Book Management -------- */

  addBook(book) {
    if (this.books.has(book.id)) {
      throw new Error(`Book with id "${book.id}" already exists.`);
    }
    this.books.set(book.id, book);
  }

  getBook(bookId) {
    const book = this.books.get(bookId);
    if (!book) throw new Error(`Book with id "${bookId}" not found.`);
    return book;
  }

  listBooks() {
    return Array.from(this.books.values());
  }

  /* -------- Borrowing System -------- */

  getActiveBorrowsByUser(userId) {
    return Array.from(this.transactions.values()).filter(
      (t) => t.userId === userId && !t.isReturned
    );
  }

  borrowBook(userId, bookId, daysToBorrow = 7) {
    const user = this.getUser(userId);
    const book = this.getBook(bookId);

    if (!book.isAvailable) {
      throw new Error(`Book "${book.title}" is currently not available.`);
    }

    const activeBorrows = this.getActiveBorrowsByUser(userId);
    if (activeBorrows.length >= user.maxBorrowLimit) {
      throw new Error(
        `${user.getType()} "${user.name}" reached borrow limit (${
          user.maxBorrowLimit
        }).`
      );
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + daysToBorrow);

    const transaction = new BorrowTransaction({
      id: `T${this.transactionCounter++}`,
      userId,
      bookId,
      borrowDate,
      dueDate,
    });

    this.transactions.set(transaction.id, transaction);
    book.isAvailable = false;

    return transaction;
  }

  returnBook(userId, bookId) {
    const book = this.getBook(bookId);

    const activeTransaction = Array.from(this.transactions.values()).find(
      (t) => t.userId === userId && t.bookId === bookId && !t.isReturned
    );

    if (!activeTransaction) {
      throw new Error(
        `No active borrow found for user "${userId}" and book "${bookId}".`
      );
    }

    activeTransaction.markReturned(new Date());
    book.isAvailable = true;

    return activeTransaction;
  }

  viewBorrowedBooks(userId) {
    const active = this.getActiveBorrowsByUser(userId);
    return active.map((t) => {
      const book = this.getBook(t.bookId);
      return {
        transactionId: t.id,
        bookId: book.id,
        title: book.title,
        dueDate: t.dueDate,
        isOverdue: t.isOverdue,
      };
    });
  }

  // Overdue simulation: set flag + notify users (Observer)
  checkOverdues(today = new Date()) {
    for (const t of this.transactions.values()) {
      const wasOverdue = t.isOverdue;
      const overdueNow = t.checkOverdue(today);

      if (overdueNow && !wasOverdue) {
        const book = this.getBook(t.bookId);
        this.notificationService.notifyUser(
          t.userId,
          `Your borrowed book "${
            book.title
          }" is OVERDUE! Due: ${t.dueDate.toDateString()}`
        );
      }
    }
  }
}

/* =========================
   TEST / DEMO
========================= */

(function demo() {
  const library = LibrarySystem.getInstance();

  // Create users with Factory
  const u1 = UserFactory.createUser("student", "U1", "Ghada");
  const u2 = UserFactory.createUser("teacher", "U2", "Helena");

  library.addUser(u1);
  library.addUser(u2);

  // Add books
  library.addBook(new Book("B1", "Clean Code", "Robert C. Martin"));
  library.addBook(new Book("B2", "Design Patterns", "GoF"));
  library.addBook(new Book("B3", "You Don’t Know JS", "Kyle Simpson"));

  // Borrow
  const t1 = library.borrowBook("U1", "B1", 3);
  const t2 = library.borrowBook("U2", "B2", 1);

  console.log("\n--- Borrowed books (U1) ---");
  console.log(library.viewBorrowedBooks("U1"));

  console.log("\n--- Borrowed books (U2) ---");
  console.log(library.viewBorrowedBooks("U2"));

  // Simulate time passing to trigger overdue
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  console.log("\n--- Checking overdues (simulated date: +2 days) ---");
  library.checkOverdues(tomorrow);

  // Return a book
  console.log("\n--- Returning B1 for U1 ---");
  library.returnBook("U1", "B1");
  console.log(library.viewBorrowedBooks("U1"));

  console.log("\n--- Notifications stored on users ---");
  console.log("U1 notifications:", u1.notifications);
  console.log("U2 notifications:", u2.notifications);
})();
