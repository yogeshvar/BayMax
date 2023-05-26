import { useColorMode } from "@chakra-ui/react";
import Main from "./Pages/Main";
import { useEffect } from "react";

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === "dark") {
      toggleColorMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Main />;
};

export default App;
