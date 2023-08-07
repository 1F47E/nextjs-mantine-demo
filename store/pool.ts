import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/*
api data
    "height": 2470599,
    "size": 21,
    "amount": 97563011781,
    "weight": 22949,
    "fee": 40165,
*/
interface Pool {
  height: number,
  size: number,
  amount: number,
  weight: number,
  fee: number,
  avg_fee: number,
  fee_buckets: number[],
}



export interface FeeBucketState {
  pool: null | Pool,
  updatePool: (r: null | Pool) => void
}

export interface StorageState {
  pool: null | Pool,
  updatePool: (r: null | Pool) => void
}

export const usePoolStore = create<StorageState>()(
  devtools(
    persist(
      (set) => ({
        pool: {
          height: 0,
          size: 0,
          amount: 0,
          weight: 0,
          fee: 0,
          avg_fee: 0,
          fee_buckets: [],
        },
        feeBuckets: [],
        updatePool: (p:null | Pool) => set(() => ({ pool: p })),
      }),
      {
        name: 'pool-storage',
      }
    )
  )
);
