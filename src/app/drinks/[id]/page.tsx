'use client';

import PieChart from '@/components/pie-chart';
import { getColor } from '@/utils/colors';
import { DrinkImage } from '@/components/drink-image';
import { BodyTypography } from '@/components/typography';
import { getDrinkById } from '@/services/drinks';
import { Box, CircularProgress, styled, Typography, TypographyProps } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import { useMemo } from 'react';
import { PieChartData } from '@/shared-types';
import { standardizeUnit } from '@/utils/drinks';

const PageContainer = styled(Box)({
    maxWidth: '400px',
    margin: 'auto',
    padding: '30px 20px 0',
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

const IngredientsLabel = styled(Typography)({
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: '20px',
});

const InstructionsText = styled(BodyTypography)({
    margin: '30px 0 20px',
});

export default function DrinkPage() {
    const params = useParams();
    const id = params.id as string;
    const { isPending, error, data } = useQuery({
        queryKey: ['drink'],
        queryFn: () => getDrinkById(id),
    });

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
        [data]
    );

    const legend = data?.ingredients.map(({ name, measurement }, i) => {
        return {
            color: getColor(i),
            label: `${name} ${measurement && `(${measurement})`}`,
        };
    });

    if (isPending) {
        return (
            <PageContainer sx={{ textAlign: 'center' }}>
                <CircularProgress />
            </PageContainer>
        );
    }

    if (error || !data) {
        return notFound();
    }

    return (
        <PageContainer>
            <DrinkDetails>
                <DrinkImage src={data.image} alt={data.name} width="150px" height="150px" />
                <DrinkName component="h1">{data.name}</DrinkName>
            </DrinkDetails>

            <IngredientsContainer>
                <IngredientsLabel>Ingredients</IngredientsLabel>

                {chartData && legend && <PieChart data={chartData} legend={legend} />}
            </IngredientsContainer>

            <InstructionsText>{data.instructions}</InstructionsText>
        </PageContainer>
    );
}
