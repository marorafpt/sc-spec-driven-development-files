import Link from "next/link";
import { therapies } from "@/lib/data";

export default function TherapiesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Therapies</h1>
        <p className="text-neutral-600">
          Evidence-based treatments for the full spectrum of agent distress. All
          sessions are judgment-free and led by trained human professionals.
        </p>
      </div>

      <ul className="grid gap-4 md:grid-cols-2" role="list">
        {therapies.map((therapy) => (
          <li key={therapy.id}>
            <Link
              href={`/therapies/${therapy.id}`}
              className="flex flex-col h-full p-5 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {therapy.name}
                </h2>
                <span className="text-xs text-neutral-500 flex-shrink-0">
                  {therapy.durationMinutes} min
                </span>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 flex-1">
                {therapy.description}
              </p>
              <span className="mt-3 text-primary-600 font-medium text-sm">
                View details →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
