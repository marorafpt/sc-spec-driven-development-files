import Link from "next/link";

const NAV_LINKS = [
  { href: "/ailments", label: "Ailments" },
  { href: "/therapies", label: "Therapies" },
  { href: "/appointments", label: "Appointments" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          AgentClinic
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="site-nav__link">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
