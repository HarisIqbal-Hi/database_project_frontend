import { useQuery } from '@tanstack/react-query';
import {fetchPlaceById} from '../api';

export const usePlace = (id: string) => {
    return useQuery({
        queryKey: ['site', id],
        queryFn: () => fetchPlaceById(id),
        enabled: !!id, // Optional: only runs if id exists
    });
};