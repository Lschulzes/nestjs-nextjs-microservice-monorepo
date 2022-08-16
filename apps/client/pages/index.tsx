import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import buildClient from '../api/buildClient';
import useRequest from '../hooks/useRequest';

type PageProps = {
  user: { id: string; email: string } | null;
  posts: Array<{ title: string; description: string }>;
};

type FormInputs = {
  title: string;
  description: string;
};

const Home: NextPage<PageProps> = ({ user, posts }: PageProps) => {
  const { reload } = useRouter();
  const { register, handleSubmit } = useForm<FormInputs>();
  const { executeRequest, errors } = useRequest();

  const onSubmit = async (formData: FormInputs) => {
    const { error } = await executeRequest<FormInputs>({
      url: '/api/posts',
      method: 'post',
      body: formData,
    });

    if (error) return;

    reload();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container py-4">
        <h1>Create Post</h1>

        <div className="form-group">
          <label htmlFor="Title-form">Title Address</label>
          <input id="Title-form" {...register('title', { required: true })} type="text" className="form-control" />
        </div>

        <div className="form-group my-3">
          <label htmlFor="form-Description">Description</label>
          <input
            id="form-Description"
            {...register('description', { required: true })}
            type="Description"
            className="form-control"
          />
        </div>

        {errors && errors?.message && errors?.message.length > 0 && (
          <div className="alert alert-danger">
            <h3>Oops...</h3>

            <ul className="my-0">
              {errors?.message.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      <h3>Hello {user?.email}!</h3>

      <div className="d-flex flex-column px-4">
        {posts.map(({ description, title }) => (
          <div key={title} className="card bg-dark text-light p-3 my-2">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ posts: any }> = async ({ req }) => {
  const client = buildClient(req);
  const { data } = await client.get('/api/posts/');

  return { props: { posts: data } };
};

export default Home;
