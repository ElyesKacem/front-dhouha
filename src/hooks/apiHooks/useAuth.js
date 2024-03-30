import { useState } from "react";
import baseUrl from "../../utils/baseURL";
import { useUser } from "../useUser";
import { useQuery } from "react-query";

const useAuth = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { saveUser } = useUser();
  const authCall = async (data) => {
    setIsLoading(true);
    try {
      const res = await baseUrl.post(url, data);
      setData(res.data);
      saveUser(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, authCall };
};

const getLoggedUser = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseUrl.get("/users/getMe", config);
  return res.data;
};

const useLoggedUser = (url) => {
  const { data } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: () => getLoggedUser(),
  });
  return { data };
};

export { useAuth, useLoggedUser };
