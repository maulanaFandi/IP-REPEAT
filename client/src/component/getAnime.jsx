import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useDispatch, useSelector } from "react-redux";
import { setAnimes } from "../actions/animeActions";

export default function GetAnime() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.animes.animes);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://api.jikan.moe/v4/anime`, {
        params: {
          type: type !== "all" ? type : undefined,
          q: search || undefined,
          page,
        },
      });
      dispatch(setAnimes(res.data.data));
      setData([...data, ...res.data.data]);
      setPage(page + 1);
      if (
        res.data.pagination.current_page ===
        res.data.pagination.last_visible_page
      ) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1); // Reset page number when search changes
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2015%2F12%2F33962-anime.jpg&f=1&nofb=1&ipt=2adf464e8789d3b1da9a39a8efbf2f4fef17f6f26c36908af0566c35531c4747&ipo=images')`, // replace 'https://example.com/background-image.jpg' with your image URL
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="search">
      <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <InputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search anime" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={fetchData} // Trigger search on icon click
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <FormControl>
            <InputLabel id="demo-simple-select-label" sx={{ ml: 1 }}>
              Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              name="type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"tv"}>TV</MenuItem>
              <MenuItem value={"movie"}>Movie</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>

      <InfiniteScroll
        key={data.id}
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
            .map((value) => (
              <Grid
                sx={{ justifyContent: "center" }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={value.id}>
                <Card sx={{ maxHeight: 200, minHeight: 200 }}>
                  <CardActionArea
                    component={Link}
                    to={`/payment`}>
                    <CardMedia
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      component="img"
                      display="flex"
                      height={"450px"}
                      image={value.images?.webp.large_image_url}
                    />
                    <CardContent
                      sx={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h5"
                        align="center">
                        Title: {value.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="h2"
                        align="center">
                        {value.title_japanese}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
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
    </div>
  );
}
