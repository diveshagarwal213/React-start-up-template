import React from "react";
import { createBrowserRouter } from "react-router-dom";
//pages
import Core from "./Core";
import PageNotFound from "./pages/others/PageNotFound";
import Home from "./pages/Home/Home";
import Park from "./pages/Park/Park";

//Lazy pages
const LazyRestaurant = React.lazy(
  () => import("./pages/Restaurant/Restaurant")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Core />,
    errorElement: <PageNotFound />,
    //do not make child routes of '/'
    //use navigate to redirect to main page or use this as Landing page
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        index: true,
        element: "Hall",
      },
      {
        path: "hall",
        element: "Hall",
      },
      {
        path: "room",
        element: "room",
      },
      { path: "basement", element: <div>basement</div> },
    ],
  },
  {
    path: "garden",
    element: <div>garden</div>,
  },
  {
    path: "park",
    element: <Park />,

    children: [
      { index: true, element: "playGround" },
      { path: "playground", element: "playGround" },
    ],
  },
  {
    path: "restaurant",
    element: (
      <React.Suspense fallback="Loading...">
        <LazyRestaurant />
      </React.Suspense>
    ),
  },
]);

export default router;
