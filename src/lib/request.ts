/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';
import type { Body } from 'node-fetch';

// TODO: Support more methods, let's keep it simple for now

export type RequestObject = {
  name: string;
  method: 'GET';
  url: string;
};

export type FactoryConfig = {
  baseURL?: string;
  requests: Array<RequestObject>;
};

export type OnData = ({ name, data }: { name: string; data: unknown }) => void;

class RequestFactory {
  private baseURL: string;

  private requests: Array<RequestObject>;

  constructor(options: FactoryConfig) {
    this.baseURL = options?.baseURL ?? '';
    this.requests = options.requests;
  }

  request(config: RequestObject): Promise<Body> {
    return fetch(`${this.baseURL}${config.url}`);
  }

  compileRequests(mapFn: OnData, onError: (e: Error) => any): void {
    this.requests.forEach((request) => {
      this.request(request)
        .then((res) => {
          res.json().then((data: unknown) => {
            mapFn({ data, name: request.name });
          });
        })
        .catch(onError);
    });
  }
}

export default RequestFactory;
