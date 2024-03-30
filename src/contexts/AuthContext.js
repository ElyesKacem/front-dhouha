import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { setItem, removeItem } = useLocalStorage();
  const saveUser = async (data) => {
    setUser(data.user);
    setToken(data.token);
    setItem("token", data.token);
    setItem("user", JSON.stringify(data.user));
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    removeItem("token");
    removeItem("user");
  };
  //   useEffect(() => {
  //     async function fetch() {
  //       if (!user) {
  //         await getDataCall();
  //         setUser(data);
  //       }
  //     }
  //     fetch();
  //   });

  return (
    <AuthContext.Provider value={{ token, user, saveUser, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
