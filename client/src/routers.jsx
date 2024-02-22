import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import LayOut from "./layout/layout";
import HomePage from "./component/getAnime";
import AnimeId from "./component/animeById";
import FailedPay from "./views/paymentFail";
import SuccessPay from "./views/paymentSucces";
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
      loader: () => localStorage.getItem("access_token") && redirect("/anime"),
    },
    {
      loader: () => !localStorage.getItem("access_token") && redirect("/login"),
      children: [
        {
          path: "/anime",
          element: <LayOut />,
          children: [
            {
              path: "/anime",
              element: <HomePage />,
            },
          ],
        },
        {
          path: "/anime/:id",
          element: <LayOut />,
          children: [
            {
              path: "/anime/:id",
              element: <AnimeId />,
            },
          ],
        },
        {
          path: "/payment/success",
          element: <SuccessPay />,
          loader: () => {
            const isPremium = localStorage.getItem("access_token") === "Premium";
            return isPremium ? redirect("/anime/:id") : null;
          },
        },
        {
          path: "/payment/failed",
          element: <FailedPay />,
        }
      ],
    },
  ]);

  export default router