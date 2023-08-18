import axiosClient from '@apis/axios';
import { AxiosError, AxiosResponse, Method } from 'axios';
import React, { useEffect, useState } from 'react';

interface ApiResponse<T> {
    data: T | undefined;
    loading: boolean;
    error: AxiosError<unknown> | null;
}

function useApi<T>(url: string, method: Method = 'get', data?: T): ApiResponse<T> {
    const [responseData, setResponseData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError<unknown> | null>(null);

    useEffect(() => {
        console.log('callApi', url);
        if (url.length > 0) {
            async function fetchData() {
                try {
                    let response: AxiosResponse<T>;

                    switch (method) {
                        case 'get':
                            response = await axiosClient.get(url);
                            break;
                        case 'post':
                            response = await axiosClient.post(url, null, data);
                            break;
                        // Thêm các phương thức khác tùy ý
                        default:
                            response = await axiosClient.get(url);
                            break;
                    }

                    setResponseData(response.data);
                } catch (err) {
                    setError(err as any);
                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }
    }, [url, method, data]);

    return { data, loading, error };
}

export default useApi;
