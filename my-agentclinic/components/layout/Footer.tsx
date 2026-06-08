const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {YEAR} AgentClinic — Because even a language model deserves care.</p>
    </footer>
  );
}
