import baseUrl from "../baseURL";

export const createNewCandidate = async (candidateData) => {
  try {
    const response = await baseUrl.post("/candidate/new", candidateData);
    console.log("Candidate Created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating candidate:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
