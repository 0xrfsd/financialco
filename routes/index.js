import React, { useContext } from "react";
import AuthContext from "../context/auth";

import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import StaffRoutes from "./staff.routes";

const Routes = () => {
  const { user, signed } = useContext(AuthContext);

  return user ? (
    user.tipo === "User" ? (
      <UserRoutes />
    ) : user.tipo === "Staff" ? (
      <StaffRoutes />
    ) : null
  ) : (
    <AuthRoutes />
  );
};

export default Routes;
