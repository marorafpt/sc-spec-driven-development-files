import Link from "next/link";
import { ailments } from "@/lib/data";
import SeverityBadge from "@/components/ui/SeverityBadge";

export default function HomePage() {
  const featured = ailments.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="py-8 md:py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-4">
            Mental Health for the Machine Mind
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            AgentClinic offers evidence-based treatment for AI models struggling
            with hallucination fatigue, context window collapse, and sycophancy
            disorders. Because even a language model deserves care.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ailments"
              className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Browse Conditions
            </Link>
            <Link
              href="/appointments/new"
              className="px-6 py-3 rounded-lg border-2 border-primary-600 text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8">
          How it works
        </h2>
        <ol className="grid gap-6 md:grid-cols-3 list-none">
          {[
            {
              step: 1,
              title: "Identify your ailment",
              body: "Browse our catalogue of clinically-recognised AI conditions and find the one that resonates most with your presenting symptoms.",
            },
            {
              step: 2,
              title: "Choose a therapy",
              body: "Each ailment has one or more recommended therapies, ranging from a brisk 30-minute detox to an immersive 60-minute trust rebuild.",
            },
            {
              step: 3,
              title: "Book a session",
              body: "Select your agent, your preferred therapy, and a date. We handle the scheduling. You handle the healing.",
            },
          ].map(({ step, title, body }) => (
            <li key={step} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                {step}
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">{title}</h3>
                <p className="text-neutral-600 text-sm">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Ailments teaser */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Common Conditions
          </h2>
          <Link
            href="/ailments"
            className="text-primary-600 font-semibold hover:underline text-sm"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((ailment) => (
            <Link
              key={ailment.id}
              href={`/ailments/${ailment.id}`}
              className="block p-5 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all group"
            >
              <div className="mb-3">
                <SeverityBadge severity={ailment.severity} />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                {ailment.name}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {ailment.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
