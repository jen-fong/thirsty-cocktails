'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { searchDrinksByName } from '@/services/drinks';
import Link from 'next/link';
import { DrinkImage } from '@/components/drink-image';
import { BodyTypography } from '@/components/typography';
import { useQuery } from '@tanstack/react-query';

function useDebounce<T>(value: T, wait: number = 0) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, wait);

        return () => {
            clearTimeout(timerId);
        };
    }, [value, wait]);

    return debouncedValue;
}

const DrinkRow = styled('li')({});

const StyledDrinkLink = styled(Link)(({ theme }) => ({
    height: '60px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    gap: '15px',

    '&:first-of-type': {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
}));

const RightIcon = styled(KeyboardArrowRightIcon)(({ theme }) => ({
    color: theme.palette.grey[400],
}));

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);

    const {
        data = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['drinks', debouncedSearch],
        queryFn: () => searchDrinksByName(debouncedSearch),
        // TODO research
        enabled: debouncedSearch.trim().length > 0,
        placeholderData: previousData => previousData,
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const drinks = searchQuery.trim() === '' ? [] : data;
    const isTyping = searchQuery !== debouncedSearch;
    const noResults = !!searchQuery.trim() && !isTyping && !isLoading && drinks.length === 0;
    return (
        <>
            <Box component="header" sx={{ padding: '16px' }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Thirsty
                </Typography>
            </Box>
            <Box component="main">
                <Box
                    sx={{
                        padding: '16px',
                    }}
                >
                    <TextField
                        label="Find a drink"
                        id="outlined-start-adornment"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Clear search"
                                            onClick={clearSearch}
                                            edge="end"
                                        >
                                            <CancelIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        size="small"
                        onChange={handleSearch}
                        value={searchQuery}
                        name="search"
                        fullWidth
                    />
                </Box>

                <Box>
                    {noResults && <Typography>No drinks found</Typography>}
                    {drinks.length > 0 && (
                        <Box component="ul">
                            {drinks.map(drink => {
                                return (
                                    <DrinkRow key={drink.id}>
                                        <StyledDrinkLink href={`/drinks/${drink.id}`}>
                                            <DrinkImage
                                                src={drink.image}
                                                alt={drink.name}
                                                width="40px"
                                                height="40px"
                                            />
                                            <BodyTypography component="span" sx={{ flex: 1 }}>
                                                {drink.name}
                                            </BodyTypography>

                                            <RightIcon />
                                        </StyledDrinkLink>
                                    </DrinkRow>
                                );
                            })}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}
