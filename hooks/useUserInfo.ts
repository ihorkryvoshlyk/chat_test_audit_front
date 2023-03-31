import { useState, useEffect } from "react";

import chatHttpService from "@utils/chatHttpService";
import { ChatUser } from "@interfaces/entities";

const useUserInfo = (userId) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ChatUser>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const { data: userInfo } = await chatHttpService.getUserInfo(userId);
        setIsLoading(false);
        setUser(userInfo);
      } catch (error) {
        setError(true);
        setIsLoading(false);
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
