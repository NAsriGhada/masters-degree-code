export default function Footer() {
  return (
    <footer className="bg-[var(--accent)] text-[var(--background)] border-t border-[var(--foreground)] border-opacity-20 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-[var(--background)] text-opacity-90">
        © {new Date().getFullYear()} Ghada Nasri. All rights reserved.
      </div>
    </footer>
  );
}
