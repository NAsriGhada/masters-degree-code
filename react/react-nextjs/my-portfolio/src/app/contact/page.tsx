export default function Contact() {
  return (
    <section className="text-center py-24 px-4 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)] tracking-tight">
        Contact Me
      </h2>
      <p className="text-lg text-[var(--foreground)] text-opacity-80 mb-8">
        I’d love to hear from you — whether it’s a project idea, collaboration,
        or just to say hello.
      </p>
      <a
        href="mailto:your@email.com"
        className="inline-block bg-[var(--accent)] text-[var(--background)] px-6 py-3 rounded-lg text-lg font-medium hover:opacity-90 transition duration-200"
      >
        Send Email
      </a>
    </section>
  );
}
