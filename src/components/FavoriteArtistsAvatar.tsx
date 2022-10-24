import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getFavoriteArtists, deleteFavoriteArtist } from "../api/artists";
import { Typography } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "100px",
      height: "100px",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0] || ""}`,
  };
}

export const FavoriteArtistsAvatar = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: artists,
  } = useQuery("favoriteArtists", getFavoriteArtists);

  const deleteTodoMutation = useMutation(deleteFavoriteArtist, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("favoriteArtists");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occured.</div>;
  }

  return (
    <>
      <Typography variant="h4" component="h2" align="left">
        Your favorite artists
      </Typography>
      <Stack direction="row" spacing={5} style={{ alignItems: "center" }}>
        {artists.map((el: any) => (
          <div key={el?.id}>
            <Avatar {...stringAvatar(el?.artistName)} />

            <p style={{ alignItems: "center" }}>
              {el?.artistName} - <br />
              <span
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => deleteTodoMutation.mutate({ id: el?.id })}
              >
                Unfollow
              </span>
            </p>
          </div>
        ))}
      </Stack>
    </>
  );
};
