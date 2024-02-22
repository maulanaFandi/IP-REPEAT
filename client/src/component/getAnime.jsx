import React, { useState } from "react";
import axios from "axios";
// import axios from "../helpers/axios";
import InfiniteScroll from "react-infinite-scroller";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { Paper, InputBase, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function GetAnime() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  // const base_url_api = import.meta.VITE_BASE_URL_API;

  const fetchData = () => {
    axios
      .get(
        `https://api.jikan.moe/v4/anime`
        // base_url_api + "/anime"
      )
      .then((res) => {
        setData([...data, ...res.data.data]);
        setPage(page + 1);
        if (
          res.data.pagination.current_page === res.data.pagination.last_page
        ) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);
  return (
    <>
      <div className="search">
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}>
          <InputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <FormControl>
            <InputLabel id="demo-simple-select-label" sx={{ ml: 1, flex: 1 }}>
            Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              name="type"
              onChange={(e) => setType(e.target.value)}>
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"tv"}>TV</MenuItem>
              <MenuItem value={"movie"}>Movie</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchData}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            <h4>Loading...</h4>
          </div>
        }>
        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
          container
          spacing={2}>
          {data
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
            })
            .filter((value) => {
              if (type === "all") {
                return value;
              }
              if (type === "tv") {
                return value.type === "tv";
              }
              if (type === "movie") {
                return value.type === "movie";
              }
            })
            .map((value) => (
              <Grid
                sx={{ justifyContent: "center" }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={value.id}>
                <Card>
                  <CardActionArea
                    component={Link}
                    to={`/anime/${value.mal_id}`}>
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
                      image={value.images?.webp.large_image_url}
                    />
                    <CardContent
                      sx={{
                        height: "100px",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h5"
                        align="center">
                        Title: {value.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center">
                        {value.title_japanese}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center">
                        Year: {value.year}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
}
