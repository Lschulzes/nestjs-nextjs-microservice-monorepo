import type { NextPage } from 'next';

type PageProps = {
  user: { id: string; email: string } | null;
};

const Home: NextPage<PageProps> = ({ user }: PageProps) => {
  return <h3>Hello {user?.email}!</h3>;
};

export default Home;
