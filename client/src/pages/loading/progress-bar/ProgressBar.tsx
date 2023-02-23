
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

export function LinearIndeterminate() {
    const isBigScreen = useMediaQuery('(min-width:600px)');
    return (
        <Box sx={{ width: isBigScreen ? '15vw' : '30vw' }}>
            <LinearProgress
                color='primary'
                sx={{
                    backgroundColor: '#FFFFFF',
                    height: 8
                }} />
        </Box>
    );
}