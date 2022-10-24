import { axiosInstance as axios } from "./axios";

export const getTopMixes = async (): Promise<any> => {
  try {
    const response = await axios.get("/topTenMixes?_start=0&_end=5");
    return response.data;
  } catch (error) {}
};
