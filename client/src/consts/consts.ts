import useMediaQuery from "@mui/material/useMediaQuery";

export const useIsBigScreen = () => useMediaQuery('(min-width: 600px)');