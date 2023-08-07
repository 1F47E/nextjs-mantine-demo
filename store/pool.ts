import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Pool {
  height: number,
  size: number,
  size_history: number[],
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
          size_history: [],
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
