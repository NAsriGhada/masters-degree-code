import Image from "next/image";

export default function About() {
  return (
    <section className="py-24 px-4 max-w-3xl mx-auto text-center">
      <Image
        src="/profile.jpg"
        alt="Ghada's profile"
        width={140}
        height={140}
        className="rounded-full mx-auto mb-6 shadow-md"
      />

      <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-6">
        About Me
      </h2>

      <p className="text-lg md:text-xl text-[var(--foreground)] text-opacity-80 leading-relaxed mb-10">
        I’m a self-taught web developer with a strong passion for crafting
        clean, scalable, and accessible applications. My journey began with
        curiosity, and now it&apos;s fueled by purpose — blending code with
        design to create experiences that work and wow.
      </p>

      <Image
        src="/workspace.png"
        alt="Workspace"
        width={720}
        height={400}
        className="rounded-xl mx-auto shadow-sm border border-[var(--border)]"
      />
    </section>
  );
}
