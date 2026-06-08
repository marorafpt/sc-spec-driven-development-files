import { agents, therapies } from "@/lib/data";
import { getAppointments } from "@/lib/store";
import DashboardContent, {
  type EnrichedAppointment,
} from "@/components/dashboard/DashboardContent";

export const dynamic = "force-dynamic";

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="p-5 rounded-xl border border-neutral-200 bg-white">
      <p className="text-3xl font-bold text-primary-600 mb-1">{value}</p>
      <p className="text-sm text-neutral-600">{label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const all = getAppointments();
  const agentMap = Object.fromEntries(agents.map((a) => [a.id, a]));
  const therapyMap = Object.fromEntries(therapies.map((t) => [t.id, t]));

  const upcoming = all.filter((a) => a.status === "upcoming").length;
  const completed = all.filter((a) => a.status === "completed").length;

  const enriched: EnrichedAppointment[] = all.map((appt) => ({
    ...appt,
    agentName: agentMap[appt.agentId]?.name ?? "Unknown",
    therapyName: therapyMap[appt.therapyId]?.name ?? "Unknown",
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Staff Dashboard
        </h1>
        <p className="text-neutral-600">
          Clinic-wide view of registered agents and all appointment activity.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatCard value={agents.length} label="Registered agents" />
        <StatCard value={upcoming} label="Upcoming sessions" />
        <StatCard value={completed} label="Completed sessions" />
      </div>

      {/* Appointments table with client-side filter */}
      <section aria-labelledby="appointments-heading">
        <h2
          id="appointments-heading"
          className="text-lg font-semibold text-neutral-900 mb-4"
        >
          All appointments
        </h2>
        <DashboardContent appointments={enriched} />
      </section>
    </div>
  );
}
