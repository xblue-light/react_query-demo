import Typography from "@mui/material/Typography";
import { useQueryClient, useMutation, useInfiniteQuery } from "react-query";
import { addFavArtist, getPopularArtists } from "../api/artists";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

interface BasicCardProps {
  data: any;
  isLoading: boolean;
}

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

export const BasicCard = ({ data, isLoading }: BasicCardProps) => {
  const queryClient = useQueryClient();

  const addFavArtistMutation = useMutation(addFavArtist, {
    onSuccess: () => {
      queryClient.invalidateQueries("favoriteArtists"); // Invalidates cache and refetch
    },
  });

  return (
    <div className="App">
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <Stack
            direction="row"
            spacing={3}
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {data.pages.map((group: any, i: any) =>
              group.response.map((char: any) => (
                <Typography variant="body2" component="div" align="center">
                  <Avatar {...stringAvatar(char?.name)} />
                  {char?.name} - <br />
                  <span
                    style={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "11px",
                    }}
                    onClick={() =>
                      addFavArtistMutation.mutate({
                        id: char?.id,
                        artistName: char?.name,
                      })
                    }
                  >
                    Follow
                  </span>
                </Typography>
              ))
            )}
          </Stack>
        </>
      )}
    </div>
  );
};

export const PopularArtistsList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery("popularArtists", getPopularArtists, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <BasicCard data={data} isLoading={isLoading} />
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </>
  );
};
