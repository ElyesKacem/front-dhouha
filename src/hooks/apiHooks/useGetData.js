import { useState, useEffect } from "react";
import baseUrl from "../../api/baseURL";
// import { useLocalStorage } from "../useLocalStorage";
import { useQuery } from "react-query";

// const useGetDataEffect = (url, protect) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { getItem } = useLocalStorage();

//   const getDataCall = async () => {
//     setIsLoading(true);
//     try {
//       let config = {};
//       if (protect) {
//         config = {
//           headers: {
//             Authorization: `Bearer ${getItem("token")}`,
//           },
//         };
//       }
//       const res = await baseUrl.get(url, config);
//       setData(res.data);
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//     setIsLoading(false);
//   };

//   return { data, isLoading, error, getDataCall };
// };

// const useGetData = (url, protect) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { getItem } = useLocalStorage();

//   const getDataCall = async () => {
//     setIsLoading(true);
//     try {
//       let config = {};
//       if (protect) {
//         config = {
//           headers: {
//             Authorization: `Bearer ${getItem("token")}`,
//           },
//         };
//       }
//       const res = await baseUrl.get(url, config);
//       setData(res.data);
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getDataCall();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return { data, isLoading, error, getDataCall };
// };

function usePaginatedData(apiEndpoint, key) {
  const [page, setPage] = useState(1);
  const { data, isFetching, isSuccess, ...rest } = useQuery(
    [key, page],
    () => fetchData(apiEndpoint, page),
    { keepPreviousData: true }
  );

  function fetchData(url, page) {
    return baseUrl.get(`${url}?page=${page}`).then((res) => res.data);
  }

  function loadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  function selectPage(page) {
    setPage(page);
  }

  return { data, isFetching, selectPage, isSuccess, loadMore, ...rest };
}

export { usePaginatedData };
