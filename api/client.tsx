/* eslint-disable no-console */
// import wretch from 'wretch';
// import { usePoolStore } from '../store/pool';

// const HOST_URL = process.env.NEXT_PUBLIC_SERVER_HOST;
const HOST_URL = 'http://localhost:8080/v0/';

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

    const apiUrl = `${HOST_URL}${url}`;
    console.log('fetching', apiUrl);
    const response = await fetch(`${HOST_URL}${url}`, {
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
