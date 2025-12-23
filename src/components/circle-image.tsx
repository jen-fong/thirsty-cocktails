import { styled } from '@mui/material';

export const CircleImage = styled('img')(({ width, height }) => ({
    height,
    width,
    borderRadius: '50%',
}));
