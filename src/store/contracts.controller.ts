import { IdlAccounts } from '@project-serum/anchor'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SolShieldSdk } from 'hooks/useProgram'

/**
 * Store constructor
 */
export type ContractData = IdlAccounts<SolShieldSdk>['contract']

export type ContractState = Record<string, ContractData>

const NAME = 'contracts'
const initialState: ContractState = {}

/**
 * Actions
 */

export const initContracts = createAsyncThunk(
  `${NAME}/initContracts
  `,
  async (bulk: ContractState) => {
    return bulk
  },
)

export const upsetContract = createAsyncThunk<
  ContractState,
  { address: string; data: ContractData },
  { state: any }
>(`${NAME}/upsetContract`, async ({ address, data }) => {
  return { [address]: data }
})

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initContracts.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetContract.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
