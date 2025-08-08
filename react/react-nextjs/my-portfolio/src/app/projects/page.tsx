export default function Projects() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight text-center mb-12">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Project Card 1 */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            🌐 Portfolio Website
          </h3>
          <p className="text-[var(--foreground)] text-opacity-80 leading-relaxed">
            A sleek, responsive portfolio built with Next.js App Router and
            Tailwind CSS v4, focused on accessibility and performance.
          </p>
        </div>

        {/* Project Card 2 */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            🛒 E-commerce API
          </h3>
          <p className="text-[var(--foreground)] text-opacity-80 leading-relaxed">
            A robust backend service built using Node.js, Express, MongoDB, and
            JWT authentication — powering real-world online stores.
          </p>
        </div>
      </div>
    </section>
  );
}
