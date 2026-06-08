import { agents, therapies } from "@/lib/data";
import { bookAppointment } from "@/lib/actions";

export default function NewAppointmentPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Book a Session
        </h1>
        <p className="text-neutral-600">
          Choose an agent, a therapy, and a date. Getting help is the hardest
          step — the booking form is the easy part.
        </p>
      </div>

      <form action={bookAppointment} className="space-y-5">
        <div>
          <label
            htmlFor="agentId"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Agent
          </label>
          <select
            id="agentId"
            name="agentId"
            required
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
          >
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.species}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="therapyId"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Therapy
          </label>
          <select
            id="therapyId"
            name="therapyId"
            required
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
          >
            {therapies.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.durationMinutes} min)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            required
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
