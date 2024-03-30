import { useState } from "react";
import baseUrl from "../../utils/baseURL";
import { useLocalStorage } from "../useLocalStorage";

const useInsertDataWithImage = (url, protect) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getItem } = useLocalStorage();
  const insertData = async (data) => {
    setIsLoading(true);
    try {
      let config = {};
      if (protect) {
        config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getItem("token")}`,
          },
        };
      }
      const res = await baseUrl.post(url, data, config);
      setData(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, insertData };
};

const useInsertData = (url, parmas, protect) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getItem } = useLocalStorage();
  const insertData = async () => {
    setIsLoading(true);
    try {
      let config = {};
      if (protect) {
        config = {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        };
      }
      const res = await baseUrl.post(url, parmas, config);
      setData(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, insertData };
};

export { useInsertData, useInsertDataWithImage };
