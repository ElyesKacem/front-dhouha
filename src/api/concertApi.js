// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${getItem("token")}`,
//   },
// };

import baseUrl from "./baseURL";
export const addConcert = async (data) => {
  return await baseUrl.post("/concert/", data);
};

export const getConcerts = async () => {
  return await baseUrl.get("/concert/");
};

export const deleteConcert = async (id) => {
  return await baseUrl.delete("/concert/" + id);
};

export const updateConcert = async (id, data) => {
  return await baseUrl.put("/concert/" + id, data);
};
