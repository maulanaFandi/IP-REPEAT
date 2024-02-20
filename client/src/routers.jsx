import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import LayOut from "./layout/layout";

const router = createBrowserRouter([
    {
      path: "/",
      loader: () => redirect("/login"),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => localStorage.getItem("access_token") && redirect("/home"),
    },
    {
      loader: () => !localStorage.getItem("access_token") && redirect("/login"),
      children: [
        // {
        //   path: "/anime",
        //   element: <LayOut />,
        //   children: [
        //     {
        //       path: "/anime",
        //       element: <HomePage />,
        //     },
        //   ],
        // },
        // {
        //   path: "/anime/:id",
        //   element: <LayOut />,
        //   children: [
        //     {
        //       path: "/anime/:id",
        //       element: <AnimeId />,
        //     },
        //   ],
        // }


      ],
    },
  ]);

  export default router