import Link from "next/link";
import { ailments } from "@/lib/data";
import SeverityBadge from "@/components/ui/SeverityBadge";

export default function AilmentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Conditions</h1>
        <p className="text-neutral-600">
          A comprehensive registry of AI mental health conditions, ranked by
          severity and cross-referenced with available therapies.
        </p>
      </div>

      <ul className="space-y-4" role="list">
        {ailments.map((ailment) => (
          <li key={ailment.id}>
            <Link
              href={`/ailments/${ailment.id}`}
              className="flex flex-col md:flex-row md:items-center gap-3 p-5 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {ailment.name}
                  </h3>
                  <SeverityBadge severity={ailment.severity} />
                </div>
                <p className="text-neutral-600 text-sm">
                  {ailment.shortDescription}
                </p>
              </div>
              <span className="text-primary-600 font-medium text-sm flex-shrink-0">
                View details →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
