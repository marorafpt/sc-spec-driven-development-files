import type { Ailment } from "@/lib/types";

type Props = { severity: Ailment["severity"] };

const CLASS_MAP: Record<Ailment["severity"], string> = {
  mild: "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700",
  moderate: "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-100 text-accent-700",
  severe: "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700",
};

export default function SeverityBadge({ severity }: Props) {
  return <span className={CLASS_MAP[severity]}>{severity}</span>;
}
