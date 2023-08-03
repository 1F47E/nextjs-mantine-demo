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





// api method GET /v0/pool no params json response

//   "data": {
//     "height": 2470599,
//     "size": 21,
//     "amount": 97563011781,
//     "weight": 22949,
//     "fee": 40165,
//   }
// maps to data from usePoolStore:
/*
interface Pool {
  height: number,
  size: number,
  amount: number,
  weight: number,
  fee: number,
}

export interface PoolState {
  pool: null | Pool,
  updatePool: (r: null | Pool) => void
}

export const usePoolStore = create<PoolState>()(
  devtools(
    persist(
      (set) => ({
        pool: null,
        updatePool: (p:null | Pool) => set(() => ({ pool: p })),
      }),
      {
        name: 'rates-storage',
      }
    )
  )
);

*/

// const api: AxiosInstance = axios.create({
//     baseURL: HOST_URL,
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
//     timeout: TIMEOUT,
//     withCredentials: false,
// });


// export const orderCreate = (params: any) => {
//     /*
//     {
//     "pair": "RUB-TON",
//     "amount_send": "500000",
//     "amount_receive": "28130977833",

//     "user_account_receive": "EQDB9Hv6Tt6tYLEaXk6uXOEcEE7gNzgcrNNgyMfqJurqlvzB",
//     "user_account_receive_type": "ton",
//     "user_account_receive_type_rub": "",

//     "user_account_payment": "4242424242424242",
//     "user_account_payment_type": "card",
//     "user_account_receive_uuid": "",

//     "user_phone": "79285554495",
//     "user_email": "milo7916724@gmail.com"
// }

//     */

//     return api.url('/order/create')
//     .post(params)
//     .fetchError((err) => {
//         console.log(err)
//         triggerInputLoading(direction, false)
//         showNotification({
//             title: 'Connection error',
//             message: 'Please retry in a second, our servers are busy',
//             color: 'red',
//         })
//     })
//     .json(data => {
//         setEstimateError(null)
//         triggerInputLoading(direction, false)
//         const d = data.data
//         console.log("API.Estimate response:")
//         console.table(d)
//         // set opposite amount
//         let amountResNano = direction === "from" ? d.amount_to : d.amount_from
//         const coinResSize = direction === "from" ? coinTo.coinSize : coinFrom.coinSize
//         const amountRes = amountResNano / coinResSize
//         let amountResNanoOriginal = direction === "from" ? d.amount_from : d.amount_to
//         const coinResSizeOriginal = direction === "from" ? coinFrom.coinSize : coinTo.coinSize
//         const amountResOriginal = amountResNanoOriginal / coinResSizeOriginal


//         // set inputs and save data
//         if (direction === "from") {
//             setInputAmountFrom(String(amountResOriginal))
//             setInputAmountTo(String(amountRes))
//             updateAmountFrom(amountResNanoOriginal)
//             updateAmountTo(amountResNano)
//         } else {
//             setInputAmountFrom(String(amountRes))
//             setInputAmountTo(String(amountResOriginal))
//             updateAmountFrom(amountResNano)
//             updateAmountTo(amountResNanoOriginal)
//         }

//     })
//     .catch(err => {
//         console.log("API.Estimate error:")
//         console.table(err)
//         console.log(err.message)

//         const errJson = JSON.parse(err.message)
//         const errMessage = errJson.error

//         console.error(errMessage)
//         setEstimateError(errMessage)
//         triggerInputLoading(direction, false)
//         showNotification({
//             title: 'Amount error',
//             message: errMessage,
//             color: 'red',
//         })
//     })
// }
// export default api;
