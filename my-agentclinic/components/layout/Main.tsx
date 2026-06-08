type Props = {
  children: React.ReactNode;
};

export default function Main({ children }: Props) {
  return <main className="site-main">{children}</main>;
}
