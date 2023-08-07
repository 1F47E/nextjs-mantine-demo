/* eslint-disable no-console */
// import wretch from 'wretch';
// import { usePoolStore } from '../store/pool';

// get the url of the websocket server from vercel envs
// NEXT_PUPLIC prefix is required for vercel to expose the env
export const API_HOST = process.env.NEXT_PUBLIC_API_HOST as string;
export const API_WS_HOST = process.env.NEXT_PUBLIC_API_WS_HOST as string;


const TIMEOUT = 5 * 1000;

// const api = wretch(HOST_URL, { mode: 'cors' })
//     .errorType('json')
//     .resolve(r => r.json()
//     );

// const fetchPool = async (): Promise<Pool | null> => {
//     try {
//         const response = await api.get('pool');
//         if (response && response.data) {
//             return response.data;
//         }
//         return null;
//     } catch (error) {
//         console.error('Failed to fetch pool', error);
//         throw error;
//     }
// };

export const fetchData = async (url: string): Promise<any> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT);

    const apiUrl = `${API_HOST}/v0/${url}`;
    console.log('fetching', apiUrl);
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};
