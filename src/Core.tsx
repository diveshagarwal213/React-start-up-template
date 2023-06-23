import { Outlet } from "react-router-dom";
function Core() {
  return (
    <div>
      My App Core
      <Outlet />
    </div>
  );
}

export default Core;
