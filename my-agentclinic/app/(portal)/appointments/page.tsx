import Link from "next/link";
import { agents, therapies } from "@/lib/data";
import { getAppointments } from "@/lib/store";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Appointment } from "@/lib/types";

export const dynamic = "force-dynamic";

function AppointmentRow({ appt }: { appt: Appointment }) {
  const agentMap = Object.fromEntries(agents.map((a) => [a.id, a]));
  const therapyMap = Object.fromEntries(therapies.map((t) => [t.id, t]));

  return (
    <li className="flex flex-col md:flex-row md:items-center gap-2 p-4 rounded-lg border border-neutral-200">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900">
          {agentMap[appt.agentId]?.name ?? "Unknown agent"}
        </p>
        <p className="text-sm text-neutral-600">
          {therapyMap[appt.therapyId]?.name ?? "Unknown therapy"} &mdash;{" "}
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

export default function AppointmentsPage() {
  const all = getAppointments();
  const upcoming = all.filter((a) => a.status === "upcoming");
  const past = all.filter((a) => a.status !== "upcoming");

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
          + Book a session
        </Link>
      </div>

      <section className="mb-10" aria-labelledby="upcoming-heading">
        <h2
          id="upcoming-heading"
          className="text-lg font-semibold text-neutral-800 mb-3"
        >
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            No upcoming appointments.{" "}
            <Link href="/appointments/new" className="text-primary-600 hover:underline">
              Book one now?
            </Link>
          </p>
        ) : (
          <ul className="space-y-3" role="list">
            {upcoming.map((appt) => (
              <AppointmentRow key={appt.id} appt={appt} />
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <h2
          id="past-heading"
          className="text-lg font-semibold text-neutral-800 mb-3"
        >
          Past sessions
        </h2>
        {past.length === 0 ? (
          <p className="text-neutral-500 text-sm">No past appointments.</p>
        ) : (
          <ul className="space-y-3" role="list">
            {past.map((appt) => (
              <AppointmentRow key={appt.id} appt={appt} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
