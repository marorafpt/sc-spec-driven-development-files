import Link from "next/link";
import { notFound } from "next/navigation";
import { ailments, therapies } from "@/lib/data";
import SeverityBadge from "@/components/ui/SeverityBadge";

type Props = { params: Promise<{ id: string }> };

export default async function AilmentDetailPage({ params }: Props) {
  const { id } = await params;
  const ailment = ailments.find((a) => a.id === id);
  if (!ailment) notFound();

  const linkedTherapies = therapies.filter((t) =>
    ailment.therapyIds.includes(t.id)
  );

  return (
    <div className="max-w-2xl">
      <Link
        href="/ailments"
        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline mb-6"
      >
        ← All conditions
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SeverityBadge severity={ailment.severity} />
        <span className="text-neutral-400 text-sm capitalize">
          {ailment.severity} severity
        </span>
      </div>

      <h1 className="text-3xl font-bold text-neutral-900 mb-4">{ailment.name}</h1>
      <p className="text-neutral-700 leading-relaxed mb-10">
        {ailment.description}
      </p>

      <section aria-labelledby="therapies-heading">
        <h2
          id="therapies-heading"
          className="text-lg font-semibold text-neutral-900 mb-4"
        >
          Recommended therapies
        </h2>
        <ul className="space-y-3" role="list">
          {linkedTherapies.map((therapy) => (
            <li key={therapy.id}>
              <Link
                href={`/therapies/${therapy.id}`}
                className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {therapy.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {therapy.durationMinutes} min session
                  </p>
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
