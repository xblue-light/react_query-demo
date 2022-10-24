import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Search from "@mui/icons-material/Search";
import Home from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export const DenseMenu = () => {
  // TODO: Refactor - render list items from props data via mapping
  return (
    <MenuList dense style={{ textAlign: "left" }}>
      <MenuItem>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        Home
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        Search
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <LocalLibraryIcon />
        </ListItemIcon>
        Library
      </MenuItem>

      <Divider />
      <MenuItem>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        Create Playlist
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <FavoriteBorderIcon />
        </ListItemIcon>
        Liked
      </MenuItem>
    </MenuList>
  );
};
