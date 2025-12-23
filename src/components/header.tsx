'use client';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { BodyTypography } from '@/components/typography';
import { useRouter } from 'next/navigation';

function HeaderContainer({ children }: { children: ReactNode }) {
    const theme = useTheme();
    return (
        <Box
            component="header"
            sx={{
                padding: '16px',
                position: 'relative',
                backgroundColor: theme.palette.grey[200],
            }}
        >
            {children}
        </Box>
    );
}

function HeaderTypography({ children }: { children: ReactNode }) {
    return (
        <Typography
            variant="h1"
            sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
            }}
        >
            {children}
        </Typography>
    );
}

function BackButton() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <Button
            sx={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                textTransform: 'none',
            }}
            variant="text"
            onClick={handleGoBack}
        >
            <KeyboardArrowLeftIcon />
            <BodyTypography component="span">Thirsty</BodyTypography>
        </Button>
    );
}

export function CustomHeader({
    children,
    showBackButton = false,
}: {
    children: ReactNode;
    showBackButton?: boolean;
}) {
    return (
        <HeaderContainer>
            {showBackButton && <BackButton />}
            <HeaderTypography>{children}</HeaderTypography>
        </HeaderContainer>
    );
}

export function ThirstyHeader() {
    return <CustomHeader>Thirsty</CustomHeader>;
}
