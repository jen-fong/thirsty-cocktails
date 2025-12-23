'use client';

import PieChart from '@/app/drinks/[id]/components/pie-chart';
import { getColor } from '@/utils/colors';
import { CircleImage } from '@/components/circle-image';
import { BodyTypography } from '@/components/typography';
import { getDrinkById } from '@/services/drinks';
import { Box, styled, Typography, TypographyProps } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import { useMemo } from 'react';
import { PieChartData } from '@/shared-types';
import { standardizeUnit } from '@/utils/drinks-measurements';
import { Loader } from '@/components/loader';
import { CustomHeader } from '@/components/header';
import { PageContainer } from '@/components/layouts';

const DrinkPageContainer = styled(PageContainer)({
    paddingTop: '30px',
});

const DrinkDetails = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
});
const DrinkName = styled(Typography)<TypographyProps>({
    fontSize: '20px',
    fontWeight: 'bold',
});

const IngredientsContainer = styled(Box)({
    margin: '30px 0 0',
});

const IngredientsLabel = styled(Typography)<TypographyProps>({
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: '20px',
});

const InstructionsTypography = styled(BodyTypography)({
    margin: '30px 0 20px',
});

export default function DrinkPage() {
    const params = useParams();
    const id = params.id as string;
    const { isPending, error, data } = useQuery({
        queryKey: ['drink', id],
        queryFn: () => getDrinkById(id),
    });

    // The pie chart must be the same measurement to properly show the ratios,
    // but we will display the full ingredient list for the legend
    const chartData = useMemo(
        () =>
            data?.ingredients
                .map((ingredient, i) => {
                    const { measurement, name } = ingredient;
                    const unitInOz = measurement && standardizeUnit(measurement);

                    if (unitInOz) {
                        return {
                            label: name,
                            value: unitInOz,
                            color: getColor(i),
                        };
                    }
                })
                .filter((ingredient): ingredient is PieChartData => ingredient !== undefined),
        [data],
    );

    const legend = data?.ingredients.map(({ name, measurement }, i) => {
        return {
            color: getColor(i),
            label: `${name}${measurement ? ` (${measurement})` : ''}`,
        };
    });

    if (isPending) {
        return (
            <DrinkPageContainer>
                <Loader />
            </DrinkPageContainer>
        );
    }

    if (error || !data) {
        return notFound();
    }

    return (
        <>
            <CustomHeader showBackButton>{data.name}</CustomHeader>
            <DrinkPageContainer>
                <DrinkDetails>
                    <CircleImage src={data.image} alt={data.name} width="150px" height="150px" />
                    <DrinkName component="h2">{data.name}</DrinkName>
                </DrinkDetails>

                <IngredientsContainer>
                    <IngredientsLabel component="h3">Ingredients</IngredientsLabel>

                    {chartData && legend && <PieChart data={chartData} legend={legend} />}
                </IngredientsContainer>

                <InstructionsTypography>{data.instructions}</InstructionsTypography>
            </DrinkPageContainer>
        </>
    );
}
