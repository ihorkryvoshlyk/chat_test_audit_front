import { useState, useEffect } from "react";

import { ChatUser } from "@interfaces/entities";
import useAxiosApi from "@hooks/useAxiosApi";
import { user as userApis } from "@utils/apis";
import { GetUserInfoApiPayload } from "@interfaces/payloads";
import { GetUserInfoApiResponse } from "@interfaces/responses";

const useUserInfo = (userId) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ChatUser>();
  const [error, setError] = useState<boolean>(false);
  const { execute: getUserInfo } = useAxiosApi<
    GetUserInfoApiResponse[],
    GetUserInfoApiPayload
  >(userApis.getUserInfo);

  useEffect(() => {
    (async function () {
      if (userId) {
        try {
          setIsLoading(true);
          const { data: userInfo } = await getUserInfo({ userId });
          setIsLoading(false);
          setUser(userInfo[0]);
        } catch (error) {
          setError(true);
          setIsLoading(false);
        }
      }
    })();
  }, [userId]);

  return {
    data: user,
    isLoading,
    error
  };
};

export default useUserInfo;
