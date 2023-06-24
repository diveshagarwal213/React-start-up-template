import { Navigate, Outlet } from "react-router-dom";

function Park() {
  //protected
  const isLogin = false;

  if (isLogin) return <Navigate to={"/"} />;

  return <Outlet />;
}

export default Park;
