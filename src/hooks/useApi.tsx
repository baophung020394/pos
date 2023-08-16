import axiosClient from '@apis/axios';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: AxiosError<unknown> | null;
}

function useApi<T>(url: string): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError<unknown> | null>(null);

    useEffect(() => {
        console.log('calApi', url);
        if (url.length > 0) {
            async function fetchData() {
                try {
                    const response: AxiosResponse<T> = await axiosClient.get(url);
                    setData(response.data);
                } catch (err) {
                    setError(err as any);
                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }
    }, [url]);

    return { data, loading, error };
}

export default useApi;
