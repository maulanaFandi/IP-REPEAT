import * as React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardMedia, CircularProgress } from "@mui/material";
// import axios from "../helpers/axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function AnimeId() {
  const params = useParams();
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/` + params.id
        // `https://localhost:3000/` + params.id
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}>
      <Grid container spacing={2}>
        <Grid item>
          <CardMedia
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            component="img"
            display="flex"
            height={"500px"}
            image={data.images?.webp.large_image_url}
          />
          {/* <Img alt="image" src={data.images.jpg.large_image_url} /> */}
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography weight={"bold"} variant={"h4"} gutterBottom>
                {data.title}
              </Typography>

              <Typography weight={"bold"} variant={"h5"} gutterBottom>
                {data.title_japanese}
              </Typography>
              <Typography gutterBottom>
                <b>Background:</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {data.background}
              </Typography>
              <Typography gutterBottom>
                <b>Synopsis:</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {data.synopsis}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {data.rating}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Type: {data.type}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Socre: {data.score}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
