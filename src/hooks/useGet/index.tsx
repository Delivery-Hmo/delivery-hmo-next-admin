import { useEffect, useState } from "react";
import useAbortController from "../useAbortController";
import { BaseUrl } from "@src/types/services/http";
import useMessage from "../useMessage";
import { get } from "@src/services/http/client";

export interface PropsUseGet {
  baseUrl: BaseUrl;
  url: string;
  wait?: boolean;
  mergeResponse?: boolean;
  initLoading?: boolean;
}

const useGet = <T extends {}>({ baseUrl, url, wait, mergeResponse, initLoading }: PropsUseGet) => {
  const abortController = useAbortController();
  const [loading, setLoading] = useState(typeof initLoading === "boolean" ? initLoading : true);
  const [response, setResponse] = useState<T>();
  const message = useMessage();


  useEffect(() => {
    console.log(baseUrl, url);

    if (wait || !url || !baseUrl) return;

    const init = async () => {
      setLoading(true);

      try {
        const _response = await get<T>({ baseUrl, url, abortController: abortController.current! });

        setResponse(r =>
          mergeResponse
            ? ({ list: [...(r as any)?.list || [], ...(_response as any)?.list], total: (_response as any)?.total }) as any as T
            : _response
        );
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          message.error(error.message, 4);
          return;
        }

        if (typeof error === "string") {
          message.error(error, 4);
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [baseUrl, url, wait, mergeResponse, abortController, initLoading, message]);

  return { loading, response, setResponse };
};

export default useGet;
