import axios, { AxiosRequestHeaders } from 'axios';
import { IncomingMessage } from 'http';

export type Request = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};

const buildClient = (req: Request) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers as AxiosRequestHeaders,
    });
  }
  return axios.create({
    baseURL: '/',
  });
};

export default buildClient;
