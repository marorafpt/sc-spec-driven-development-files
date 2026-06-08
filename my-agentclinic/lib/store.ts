import type { Appointment } from "./types";
import { appointments as seedAppointments } from "./data";

// In Next.js dev mode, modules are re-evaluated on hot reload which would reset
// a module-level array. Using global persists the store across reloads.
declare global {
  // eslint-disable-next-line no-var
  var __agentclinic_store: Appointment[] | undefined;
}

if (!global.__agentclinic_store) {
  global.__agentclinic_store = [...seedAppointments];
}

export function getAppointments(): Appointment[] {
  return global.__agentclinic_store!;
}

export function addAppointment(appt: Appointment): void {
  global.__agentclinic_store!.push(appt);
}
