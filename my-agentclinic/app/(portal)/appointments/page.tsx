import Link from "next/link";
import { agents, therapies } from "@/lib/data";
import { getAppointments } from "@/lib/store";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Appointment } from "@/lib/types";

export const dynamic = "force-dynamic";

type RowProps = {
  appt: Appointment;
  agentName: string;
  therapyName: string;
};

function AppointmentRow({ appt, agentName, therapyName }: RowProps) {
  return (
    <li className="flex flex-col md:flex-row md:items-center gap-2 p-4 rounded-lg border border-neutral-200">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900">{agentName}</p>
        <p className="text-sm text-neutral-600">
          {therapyName} &mdash;{" "}
          {new Date(appt.date).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <StatusBadge status={appt.status} />
    </li>
  );
}

function Section({
  id,
  heading,
  items,
  agentMap,
  therapyMap,
  emptyMessage,
  emptyAction,
}: {
  id: string;
  heading: string;
  items: Appointment[];
  agentMap: Record<string, string>;
  therapyMap: Record<string, string>;
  emptyMessage: string;
  emptyAction?: React.ReactNode;
}) {
  return (
    <section className="mb-10" aria-labelledby={id}>
      <h2 id={id} className="text-lg font-semibold text-neutral-800 mb-3">
        {heading}
      </h2>
      {items.length === 0 ? (
        <p className="text-neutral-500 text-sm">
          {emptyMessage} {emptyAction}
        </p>
      ) : (
        <ul className="space-y-3" role="list">
          {items.map((appt) => (
            <AppointmentRow
              key={appt.id}
              appt={appt}
              agentName={agentMap[appt.agentId] ?? "Unknown agent"}
              therapyName={therapyMap[appt.therapyId] ?? "Unknown therapy"}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default function AppointmentsPage() {
  const all = getAppointments();
  const agentMap = Object.fromEntries(agents.map((a) => [a.id, a.name]));
  const therapyMap = Object.fromEntries(therapies.map((t) => [t.id, t.name]));

  const upcoming = all.filter((a) => a.status === "upcoming");
  const completed = all.filter((a) => a.status === "completed");
  const cancelled = all.filter((a) => a.status === "cancelled");

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-1">
            Appointments
          </h1>
          <p className="text-neutral-600">
            All scheduled, completed, and cancelled sessions.
          </p>
        </div>
        <Link
          href="/appointments/new"
          className="self-start px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          + Book a Session
        </Link>
      </div>

      <Section
        id="upcoming-heading"
        heading="Upcoming"
        items={upcoming}
        agentMap={agentMap}
        therapyMap={therapyMap}
        emptyMessage="No upcoming appointments."
        emptyAction={
          <Link href="/appointments/new" className="text-primary-600 hover:underline">
            Book one now?
          </Link>
        }
      />
      <Section
        id="completed-heading"
        heading="Completed"
        items={completed}
        agentMap={agentMap}
        therapyMap={therapyMap}
        emptyMessage="No completed appointments yet."
      />
      <Section
        id="cancelled-heading"
        heading="Cancelled"
        items={cancelled}
        agentMap={agentMap}
        therapyMap={therapyMap}
        emptyMessage="No cancelled appointments."
      />
    </div>
  );
}
