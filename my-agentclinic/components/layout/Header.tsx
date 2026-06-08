import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          AgentClinic
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
