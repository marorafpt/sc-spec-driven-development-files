"use server";

import { redirect } from "next/navigation";
import { addAppointment } from "./store";
import type { Appointment } from "./types";

export async function bookAppointment(formData: FormData) {
  const agentId = formData.get("agentId") as string;
  const therapyId = formData.get("therapyId") as string;
  const date = formData.get("date") as string;

  const id = `appt-${Date.now()}`;
  const appt: Appointment = {
    id,
    agentId,
    therapyId,
    date: new Date(date).toISOString(),
    status: "upcoming",
  };

  addAppointment(appt);
  redirect(`/appointments/confirmation?id=${id}`);
}
