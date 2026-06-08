import Link from "next/link";
import { notFound } from "next/navigation";
import { agents, therapies } from "@/lib/data";
import { getAppointments } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ id?: string }> };

export default async function ConfirmationPage({ searchParams }: Props) {
  const { id } = await searchParams;
  if (!id) notFound();

  const appt = getAppointments().find((a) => a.id === id);
  if (!appt) notFound();

  const agent = agents.find((a) => a.id === appt.agentId);
  const therapy = therapies.find((t) => t.id === appt.therapyId);

  const dateFormatted = new Date(appt.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-lg">
      <div className="mb-8 p-6 rounded-xl bg-primary-50 border border-primary-200">
        <p className="text-primary-700 font-semibold text-sm mb-1">
          Booking confirmed
        </p>
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          See you on {dateFormatted}
        </h1>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-neutral-500 w-20 flex-shrink-0">Agent</dt>
            <dd className="font-medium text-neutral-900">
              {agent?.name ?? "Unknown"} ({agent?.species})
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-neutral-500 w-20 flex-shrink-0">Therapy</dt>
            <dd className="font-medium text-neutral-900">
              {therapy?.name ?? "Unknown"} &mdash; {therapy?.durationMinutes} min
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-neutral-500 w-20 flex-shrink-0">Date</dt>
            <dd className="font-medium text-neutral-900">{dateFormatted}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-neutral-500 w-20 flex-shrink-0">Status</dt>
            <dd className="font-medium text-neutral-900">Upcoming</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/appointments"
          className="px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          View all appointments
        </Link>
        <Link
          href="/appointments/new"
          className="px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors"
        >
          Book another session
        </Link>
      </div>
    </div>
  );
}
