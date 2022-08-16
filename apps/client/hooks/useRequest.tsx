import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';
import { useState } from 'react';

type ErrosResponse = Array<{ message: string; field?: string }>;

type Props = {
  url: string;
  method: keyof AxiosStatic;
  body?: AxiosRequestConfig['data'];
};

export function useRequest() {
  const [errors, setErrors] = useState<ErrosResponse | null>(null);

  async function executeRequest<T>({ url, method, body }: Props): Promise<{ data: T | null; error: boolean }> {
    try {
      const { data } = await axios({
        method,
        url,
        data: body,
      });

      setErrors(null);

      return { data, error: false };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = (error.response?.data as { errors: ErrosResponse }).errors;
        setErrors(errors);
      }

      return { data: null, error: true };
    }
  }

  return { executeRequest, errors };
}

export default useRequest;
