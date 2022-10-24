import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { DenseMenu } from "./components/DenseMenu";
import { FavoriteArtistsAvatar } from "./components/FavoriteArtistsAvatar";
import { TopMixesList } from "./components/TopMixesList";
import { PopularArtistsList } from "./components/PopularArtistsList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          {/* MENU  */}
          <Grid xs={3}>
            <Item>
              {" "}
              <DenseMenu />{" "}
            </Item>
          </Grid>
          {/* CONTENT GOES HERE */}
          <Grid xs={9}>
            <Item>
              <FavoriteArtistsAvatar />
              <br />
              <br />
              <TopMixesList />
              <br />
              <br />
              <PopularArtistsList />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default App;
