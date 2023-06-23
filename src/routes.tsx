import { Outlet, createBrowserRouter } from "react-router-dom";
//pages
import Core from "./Core";
import PageNotFound from "./pages/others/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Core />,
    errorElement: <PageNotFound />,
    //do not make child routes if '/'
    //use navigate to redirect to main page
  },
  {
    path: "home",

    element: (
      <div>
        Home <br />
        <Outlet />
      </div>
    ),
    children: [{ path: "basement", element: <div>basement</div> }],
  },
  {
    path: "garden",
    element: <div>garden</div>,
  },
]);
