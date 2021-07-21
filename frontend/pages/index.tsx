import { useContext, createContext } from "react";

const Home = () => {
  const LoginContext = createContext(true);

  return <h1>Home</h1>;
};

export default Home;
