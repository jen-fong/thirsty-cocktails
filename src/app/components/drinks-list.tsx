import { styled } from '@mui/material';
import Link from 'next/link';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DrinkImage } from '@/app/components/drink-image';
import { DrinkListItem } from '@/shared-types';
import { ListTile, List, ListItem } from '@/components/list';

const DrinkListRow = styled(ListItem)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&:first-of-type': {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
}));

const StyledDrinkLink = styled(Link)(({ theme }) => ({
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
}));

const RightIcon = styled(KeyboardArrowRightIcon)(({ theme }) => ({
    color: theme.palette.grey[400],
}));

export default function DrinksList({ drinks }: { drinks: DrinkListItem[] }) {
    return (
        <List>
            {drinks.map(({ id, image, name }) => {
                return (
                    <DrinkListRow key={id}>
                        <StyledDrinkLink href={`/drinks/${id}`}>
                            <ListTile
                                tile={
                                    <DrinkImage src={image} alt={name} width="40px" height="40px" />
                                }
                                label={name}
                                spacing="15px"
                            />

                            <RightIcon />
                        </StyledDrinkLink>
                    </DrinkListRow>
                );
            })}
        </List>
    );
}
