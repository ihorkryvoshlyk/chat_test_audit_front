import { useCookies } from "react-cookie";

export default function useGetSigninId(): string {
  const [clientCookies] = useCookies();
  const id = clientCookies["Signin-UserId"];
  return id;
}
