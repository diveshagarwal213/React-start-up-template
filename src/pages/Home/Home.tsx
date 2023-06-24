import { Navigate, Outlet } from "react-router-dom";

function Home() {
  //protected
  const hasAccessToHome = false;

  if (!hasAccessToHome) return <Navigate to={"/"} />;

  return <Outlet />;
}

export default Home;
