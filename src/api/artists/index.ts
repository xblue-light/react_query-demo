import { axiosInstance as artistsAPI } from "../axios";

// FAV ARTISTS
export const getFavoriteArtists = async (): Promise<any> => {
  try {
    const response = await artistsAPI.get("/favoriteArtists");
    return response.data;
  } catch (error) {}
};

export const addFavArtist = async (artist: any): Promise<any> => {
  try {
    return await artistsAPI.post("/favoriteArtists", artist);
  } catch (error) {}
};

export const deleteFavoriteArtist = async ({ id }: any): Promise<any> => {
  try {
    return await artistsAPI.delete(`/favoriteArtists/${id}`, id);
  } catch (error) {}
};

// POPULAR ARTISTS
// export const getPopularArtists = async ({
//   pageParam = 1,
// }: any): Promise<any> => {
//   try {
//     const response = await artistsAPI.get(`/popularArtists?_page=${pageParam}`);
//     return response.data;
//   } catch (error) {}
// };

export const getPopularArtists = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5",
}) => {
  // FETCH VERSION
  // const request = await fetch(pageParam);
  // const { results, next } = await request.json();
  // return { response: results, nextPage: next };

  // AXIOS VERSION
  const res = await artistsAPI.get(pageParam);
  return { response: res.data.results, nextPage: res.data.next };
};
