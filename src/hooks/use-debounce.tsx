import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, wait: number = 0) {
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
