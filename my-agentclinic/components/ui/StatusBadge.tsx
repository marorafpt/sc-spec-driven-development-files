import type { Appointment } from "@/lib/types";

type Props = { status: Appointment["status"] };

const CLASS_MAP: Record<Appointment["status"], string> = {
  upcoming: "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-100 text-accent-700",
  completed: "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-200 text-neutral-600",
  cancelled: "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function StatusBadge({ status }: Props) {
  return <span className={CLASS_MAP[status]}>{capitalize(status)}</span>;
}
