import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useRequest from '../../hooks/useRequest';

type FormInputs = {
  email: string;
  password: string;
};

type SignupResponse = {
  id: string;
  email: string;
};

const SigninPage = () => {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm<FormInputs>();
  const { executeRequest, errors } = useRequest();

  const onSubmit = async (formData: FormInputs) => {
    const { error } = await executeRequest<SignupResponse>({
      url: '/api/users/signin',
      method: 'post',
      body: formData,
    });
    if (error) return;
    push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container py-4">
      <h1>Signin</h1>

      <div className="form-group">
        <label htmlFor="email-password">Email Address</label>
        <input id="email-password" {...register('email', { required: true })} type="text" className="form-control" />
      </div>

      <div className="form-group my-3">
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          {...register('password', { required: true })}
          type="password"
          className="form-control"
        />
      </div>

      {errors && (
        <div className="alert alert-danger">
          <h3>Oops...</h3>

          <ul className="my-0">
            {errors.map((el) => (
              <li key={el.message}>{el.message}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
};

export default SigninPage;
