// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${getItem("token")}`,
//   },
// };

import baseUrl from "./baseURL";
export const addAudition = async (data) => {
  return await baseUrl.post("/audition/"+data.season, data);
};

export const getAuditions = async () => {
    return await baseUrl.get("/audition/");
};

export const deleteAuditions = async (id) => {
  return await baseUrl.delete("/audition/" + id);
};

export const updateAuditions = async (id, data) => {
  return await baseUrl.put("/audition/" + id, data);
};
