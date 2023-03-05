import { useMediaQuery } from "@mui/material";

export const useIsBigScreen = () => useMediaQuery('(min-width: 600px)');