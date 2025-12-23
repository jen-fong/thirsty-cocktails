import { BodyTypography } from '@/components/typography';
import { PieChartData, PieChartLegend } from '@/shared-types';
import { Box, styled } from '@mui/material';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';

const IngredientsLegend = styled('ul')({
    listStyleType: 'none',
    flex: 1,
    '& :not(:last-of-type)': {
        marginBottom: '8px',
    },
});
const IngredientLegendItem = styled('li')({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
});

const LegendColor = styled(Box)<{
    color: string;
}>(({ color }) => ({
    width: '20px',
    height: '20px',
    backgroundColor: color,
    borderRadius: '3px',
    flexShrink: 0,
}));

const PieChartContainer = styled(Box)({
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    marginBottom: '20px',
});

function Legend({ data }: { data: PieChartLegend[] }) {
    return (
        <IngredientsLegend>
            {data.map(({ label, color }, i) => {
                return (
                    <IngredientLegendItem key={i}>
                        <LegendColor color={color} />
                        {label && <BodyTypography>{label}</BodyTypography>}
                    </IngredientLegendItem>
                );
            })}
        </IngredientsLegend>
    );
}

export default function PieChart({
    data,
    legend,
}: {
    data: PieChartData[];
    legend: PieChartLegend[];
}) {
    return (
        <PieChartContainer>
            <Legend data={legend} />
            {data && (
                <MuiPieChart
                    series={[
                        {
                            data,
                            valueFormatter: item => `${item.value} oz`,
                        },
                    ]}
                    width={120}
                    height={120}
                    sx={{
                        flex: 0,
                    }}
                    hideLegend
                />
            )}
        </PieChartContainer>
    );
}
