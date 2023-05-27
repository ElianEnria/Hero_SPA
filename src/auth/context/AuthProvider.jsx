import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";
// const intialState = {
//   logged: false,
// };
const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    logged: !!user,
    user,
  }
}
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {},init );
  const login = (name = "") => {
    const action = {
      type: types.login,
      payload: { id: "ABC", name: name },
    };
    localStorage.setItem("user", JSON.stringify(action.payload));
    dispatch(action);
  };
  const logout = () => {
    localStorage.removeItem("user");
    const action = {
      type: types.logout
    };
    dispatch(action);
  }

  return <AuthContext.Provider 
      value={{
        ...authState,
        login: login,
        logout: logout
      }}
    > 
      {children}
    </AuthContext.Provider>;
};
