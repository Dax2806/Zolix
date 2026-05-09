import { useContext } from "react";

import AuthContext
  from "../app/auth.context";

const useAuth = () =>
  useContext(AuthContext);

export default useAuth;