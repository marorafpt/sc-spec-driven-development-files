"use client";

import { useState } from "react";
import type { Appointment } from "@/lib/types";
import StatusBadge from "@/components/ui/StatusBadge";

export type EnrichedAppointment = Appointment & {
  agentName: string;
  therapyName: string;
};

type Filter = "all" | Appointment["status"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

type Props = { appointments: EnrichedAppointment[] };

export default function DashboardContent({ appointments }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter by status">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === value
                ? "bg-primary-600 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Agent</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Therapy</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                  No appointments for this filter.
                </td>
              </tr>
            ) : (
              filtered.map((appt) => (
                <tr key={appt.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3 text-neutral-900 font-medium">
                    {appt.agentName}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{appt.therapyName}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {new Date(appt.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={appt.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
