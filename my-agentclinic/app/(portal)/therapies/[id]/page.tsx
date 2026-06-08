import Link from "next/link";
import { notFound } from "next/navigation";
import { ailments, therapies } from "@/lib/data";
import SeverityBadge from "@/components/ui/SeverityBadge";

type Props = { params: Promise<{ id: string }> };

export default async function TherapyDetailPage({ params }: Props) {
  const { id } = await params;
  const therapy = therapies.find((t) => t.id === id);
  if (!therapy) notFound();

  const linkedAilments = ailments.filter((a) =>
    therapy.ailmentIds.includes(a.id)
  );

  return (
    <div className="max-w-2xl">
      <Link
        href="/therapies"
        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline mb-6"
      >
        ← All therapies
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
          {therapy.durationMinutes} min
        </span>
      </div>

      <h1 className="text-3xl font-bold text-neutral-900 mb-4">
        {therapy.name}
      </h1>
      <p className="text-neutral-700 leading-relaxed mb-10">
        {therapy.description}
      </p>

      <section aria-labelledby="ailments-heading">
        <h2
          id="ailments-heading"
          className="text-lg font-semibold text-neutral-900 mb-4"
        >
          Ailments treated
        </h2>
        <ul className="space-y-3" role="list">
          {linkedAilments.map((ailment) => (
            <li key={ailment.id}>
              <Link
                href={`/ailments/${ailment.id}`}
                className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {ailment.name}
                  </p>
                  <div className="mt-1">
                    <SeverityBadge severity={ailment.severity} />
                  </div>
                </div>
                <span className="text-primary-600 text-sm">View →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 pt-6 border-t border-neutral-200">
        <Link
          href="/appointments/new"
          className="inline-block px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          Book a session
        </Link>
      </div>
    </div>
  );
}
