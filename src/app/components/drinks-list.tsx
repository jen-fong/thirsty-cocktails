import { Box, styled } from '@mui/material';
import Link from 'next/link';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { BodyTypography } from '@/components/typography';
import { DrinkImage } from '@/app/components/drink-image';
import { DrinkListItem } from '@/shared-types';

const DrinkListRow = styled('li')(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&:first-of-type': {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
}));

const StyledDrinkLink = styled(Link)(({ theme }) => ({
    height: '60px',
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    gap: '15px',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
}));

const RightIcon = styled(KeyboardArrowRightIcon)(({ theme }) => ({
    color: theme.palette.grey[400],
}));

export default function DrinksList({ drinks }: { drinks: DrinkListItem[] }) {
    return (
        <Box component="ul">
            {drinks.map(({ id, image, name }) => {
                return (
                    <DrinkListRow key={id}>
                        <StyledDrinkLink href={`/drinks/${id}`}>
                            <DrinkImage src={image} alt={name} width="40px" height="40px" />
                            <BodyTypography component="span" sx={{ flex: 1 }}>
                                {name}
                            </BodyTypography>

                            <RightIcon />
                        </StyledDrinkLink>
                    </DrinkListRow>
                );
            })}
        </Box>
    );
}
