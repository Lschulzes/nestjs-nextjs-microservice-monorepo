import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

const SigninPage = () => {
  const { executeRequest } = useRequest();
  const { push } = useRouter();

  const signout = useCallback(async () => {
    const { error } = await executeRequest({ url: '/api/users/signout', method: 'post' });
    if (error) return;

    push('/');
  }, [executeRequest, push]);

  useEffect(() => {
    signout();
  }, [signout]);

  return <h3>Signin Out...</h3>;
};

export default SigninPage;
