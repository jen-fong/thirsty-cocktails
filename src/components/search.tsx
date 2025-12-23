import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { ChangeEvent, MouseEvent } from 'react';

export default function Search({
    onChange,
    value,
    onClearSearch,
    label,
    name,
}: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClearSearch: (e: MouseEvent<HTMLButtonElement>) => void;
    value: string;
    label: string;
    name?: string;
}) {
    return (
        <TextField
            label={label}
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
                                onClick={onClearSearch}
                                edge="end"
                            >
                                <CancelIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            size="small"
            onChange={onChange}
            value={value}
            name={name}
            fullWidth
        />
    );
}
