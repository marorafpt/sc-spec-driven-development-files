"use client";

import { useTransition } from "react";
import type { Agent, Therapy } from "@/lib/types";
import { bookAppointment } from "@/lib/actions";

type Props = {
  agents: Agent[];
  therapies: Therapy[];
};

export default function BookingForm({ agents, therapies }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: FormData) {
    startTransition(async () => {
      await bookAppointment(formData);
    });
  }

  return (
    <form action={handleAction} className="space-y-5">
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
          defaultValue=""
          className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
        >
          <option value="" disabled>
            Select an agent…
          </option>
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
          defaultValue=""
          className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
        >
          <option value="" disabled>
            Select a therapy…
          </option>
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
        disabled={isPending}
        className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Booking…" : "Confirm Booking"}
      </button>
    </form>
  );
}
