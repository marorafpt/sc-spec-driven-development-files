"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/ailments", label: "Ailments" },
  { href: "/therapies", label: "Therapies" },
  { href: "/appointments", label: "Appointments" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Main navigation">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive =
          pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`site-nav__link${isActive ? " site-nav__link--active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
