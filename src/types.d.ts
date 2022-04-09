/** @format */

export interface Query {
  [key: string]: string | number | undefined;
}

export type HttpClientMethod = <T>(
  path: string,
  options: HttpClientOptions
) => Promise<T | undefined>;

export interface HttpClient {
  get: HttpClientMethod;
  post: HttpClientMethod;
  patch: HttpClientMethod;
  put: HttpClientMethod;
  delete: HttpClientMethod;
}

export interface HttpClientOptions {
  query: Query;
  body?: any;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface QueryResponse {
  batchcomplete: string;
  query: {
    [key: string]: any;
  };
}
