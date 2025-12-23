import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function useSyncSearchParam({ searchQuery }: { searchQuery: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        const currentSearch = currentParams.get('search') || '';

        if (searchQuery === currentSearch) return;

        if (searchQuery) {
            currentParams.set('search', searchQuery);
        } else {
            currentParams.delete('search');
        }

        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
    }, [searchQuery, pathname, router, searchParams]);
}
