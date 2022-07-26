import { Box } from "@mui/system"

export default function Scoreboard({scores}) {
  return (
    <Box display="flex" flexDirection="column">
      {
        Object.entries(scores).map(([key, value]) => 
          <Box display="flex" flexDirection="row">
            <Box width="10rem" textAlign="right">{key}</Box>
            <Box sx={{flexGrow: 1}}></Box>
          </Box>
        )
      }
    </Box>
  )
}