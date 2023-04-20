import { useCallback, useState } from "react";
import {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";

export type AxiosApi<ResponseData, Payload> = (
  payload?: Payload,
  config?: AxiosRequestConfig
) => AxiosPromise<ResponseData>;

export default function useAxiosApi<
  ResponseData = unknown,
  Payload = unknown,
  ErrorData = unknown
>(
  api: AxiosApi<ResponseData, Payload>,
  onfulfilled?: (response: AxiosResponse<ResponseData>) => void,
  onrejected?: (error: AxiosError<ErrorData>) => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<ResponseData>();
  const [response, setResponse] = useState<AxiosResponse<ResponseData>>();
  const [error, setError] = useState<AxiosError<ErrorData>>();

  const execute = useCallback(
    (payload?: Payload, config?: AxiosRequestConfig) => {
      setIsLoading(true);
      setIsError(false);
      setData(undefined);
      setResponse(undefined);
      setError(undefined);
      const promise = api(payload, config);
      promise
        .then((resp) => {
          setIsLoading(false);
          setData(resp.data);
          setResponse(resp);
          if (onfulfilled) {
            onfulfilled(resp);
          }
        })
        .catch((err: AxiosError<ErrorData>) => {
          setIsLoading(false);
          setIsError(true);
          setError(error);
          if (onrejected) {
            onrejected(err);
          }
        });
      return promise;
    },
    [api, onfulfilled, onrejected]
  );
  return {
    execute,
    isLoading,
    isError,
    data,
    setData,
    response,
    error
  };
}
