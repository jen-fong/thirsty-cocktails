import { BodyTypography } from '@/components/typography';
import { Box, BoxProps, styled } from '@mui/material';
import { ReactNode } from 'react';

export const List = styled('ul')({
    listStyleType: 'none',
});

export const ListItem = styled('li')({
    margin: 0,
});

const ListTileContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export function ListTile({
    tile,
    label,
    spacing = '8px',
}: {
    tile: ReactNode;
    label: string;
    spacing?: BoxProps['gap'];
}) {
    return (
        <ListTileContainer
            sx={{
                gap: spacing,
            }}
        >
            {tile}
            <BodyTypography
                sx={{
                    flex: 1,
                }}
            >
                {label}
            </BodyTypography>
        </ListTileContainer>
    );
}
