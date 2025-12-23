import { Box, CircularProgress } from '@mui/material';

export function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
            role="status"
            aria-busy="true"
            aria-label="Loading..."
        >
            <CircularProgress />
        </Box>
    );
}
