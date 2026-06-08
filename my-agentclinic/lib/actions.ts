"use server";

import { redirect } from "next/navigation";
import { addAppointment } from "./store";
import { agents, therapies } from "./data";
import type { Appointment } from "./types";

export async function bookAppointment(formData: FormData) {
  const agentId = formData.get("agentId");
  const therapyId = formData.get("therapyId");
  const date = formData.get("date");

  if (!agentId || typeof agentId !== "string") throw new Error("Missing agentId");
  if (!therapyId || typeof therapyId !== "string") throw new Error("Missing therapyId");
  if (!date || typeof date !== "string") throw new Error("Missing date");

  if (!agents.find((a) => a.id === agentId)) throw new Error("Unknown agentId");
  if (!therapies.find((t) => t.id === therapyId)) throw new Error("Unknown therapyId");

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) throw new Error("Invalid date");

  const id = `appt-${Date.now()}`;
  const appt: Appointment = {
    id,
    agentId,
    therapyId,
    date: dateObj.toISOString(),
    status: "upcoming",
  };

  addAppointment(appt);
  redirect(`/appointments/confirmation?id=${id}`);
}
