import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[var(--accent)] text-[var(--background)] shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Branding */}
        <h1 className="text-2xl font-bold tracking-tight">
          Ghada<span className="text-opacity-70 font-light">.dev</span>
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-lg font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
