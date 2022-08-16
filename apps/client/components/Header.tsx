import Link from 'next/link';

export type Props = {
  user: { id: string; email: string } | null;
};

const Header = ({ user }: Props) => {
  const links = [
    { label: 'Sign Up', href: '/auth/signup', show: !user },
    { label: 'Sign In', href: '/auth/signin', show: !user },
    { label: 'Sign Out', href: '/auth/signout', show: user },
  ]
    .filter((linkConfig) => linkConfig.show)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-dark bg-dark p-2">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
