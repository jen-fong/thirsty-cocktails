'use client';

import { ChangeEvent, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { searchDrinksByName } from '@/services/drinks';
import { BodyTypography } from '@/components/typography';
import Search from '@/components/search';
import DrinksList from '@/app/components/drinks-list';
import { Loader } from '@/components/loader';
import { DrinkListItem } from '@/shared-types';
import useDebounce from '@/hooks/use-debounce';
import { ThirstyHeader } from '@/components/header';
import { useSearchParams } from 'next/navigation';
import { useSyncSearchParam } from '@/hooks/use-sync-search-param';

const DEBOUNCE_WAIT = 250;

function Results({
    error,
    isLoading,
    data,
    showNoResults,
}: {
    error: Error | null;
    isLoading: boolean;
    data: DrinkListItem[];
    showNoResults: boolean;
}) {
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        // Just display a generic error for this assignment
        return <BodyTypography textAlign="center">An error occurred.</BodyTypography>;
    }

    if (showNoResults) {
        return <BodyTypography textAlign="center">There were no results found</BodyTypography>;
    }

    return <DrinksList drinks={data} />;
}

export default function Home() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const debouncedSearch = useDebounce(searchQuery, DEBOUNCE_WAIT);

    const {
        data = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['drinks', debouncedSearch],
        queryFn: () => searchDrinksByName(debouncedSearch),
        enabled: debouncedSearch.trim().length > 0,
    });

    useSyncSearchParam({
        searchQuery: debouncedSearch,
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
            <ThirstyHeader />
            <Box component="main">
                <Box
                    sx={{
                        padding: '16px',
                    }}
                >
                    <Search
                        label="Find a drink"
                        onChange={handleSearch}
                        onClearSearch={clearSearch}
                        value={searchQuery}
                        name="search"
                    />
                </Box>

                <Results
                    error={error}
                    isLoading={isLoading || isTyping}
                    data={drinks}
                    showNoResults={noResults}
                />
            </Box>
        </>
    );
}
