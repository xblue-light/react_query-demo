import { useQueryClient, useQuery } from "react-query";
import { getTopMixes } from "../api/getTopMixes";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface BasicCardProps {
  topMixes: any[];
}

export const BasicCard = ({ topMixes }: BasicCardProps) => {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {topMixes.map((ele) => (
          <Card sx={{ maxWidth: 325, alignContent: "center" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="subtitle1" component="div">
                {ele?.album}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {ele?.artistName}
              </Typography>
            </CardContent>
            <CardActions sx={{ alignContent: "center" }}>
              <Button variant="outlined" size="medium" fullWidth={true}>
                Listen
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export const TopMixesList = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: topMixes,
  } = useQuery("getTopMixes", getTopMixes);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occured.</div>;
  }

  return (
    <>
      <Typography variant="h4" component="h2" align="left">
        Your top mixes
      </Typography>
      <BasicCard topMixes={topMixes} />
    </>
  );
};
