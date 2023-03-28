import { LoaderFunction } from 'react-router-dom';

export type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;

export type ResponseData<T> = {
  data: T;
  loading: boolean;
  networkStatus: number;
};
