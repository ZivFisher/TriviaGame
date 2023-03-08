import { useMediaQuery } from "@mui/material";

export const useIsBigScreen = () => useMediaQuery('(min-width: 600px)');

export const copyToClipboard = async (textToCopy: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
        console.error("Failed to copy text: ", err);
    }
};