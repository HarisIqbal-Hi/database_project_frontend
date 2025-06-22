import { useQuery } from '@tanstack/react-query';
import {fetchPlaces} from '../api';

export const usePlaces = (params?: { categoryId?: string; search?: string }) =>
    useQuery({
        queryKey: ['places', params], // key includes params for caching/filtering
        queryFn: () => fetchPlaces(params),
    });