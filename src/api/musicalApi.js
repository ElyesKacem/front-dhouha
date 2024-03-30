// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${getItem("token")}`,
//   },
// };

import baseUrl from "./baseURL";
export const addMusical = async (data) => {
  return await baseUrl.post("/musical/", data);
};

export const getMusicals = async () => {
  return await baseUrl.get("/musical/");
};

export const deleteMusicals = async (id) => {
  return await baseUrl.delete("/musical/" + id);
};

export const updateMusicals = async (id, data) => {
  return await baseUrl.put("/musical/" + id, data);
};
