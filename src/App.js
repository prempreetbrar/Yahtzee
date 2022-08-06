import { Box } from "@mui/system";

import Game from "./Game"



export default function App() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Game className="App"/>
    </Box>
  );
}
