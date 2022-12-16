import { IdlAccounts } from '@project-serum/anchor'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SolShieldSdk } from 'hooks/useProgram'

/**
 * Store constructor
 */
export type SignerData = IdlAccounts<SolShieldSdk>['contractSigner']

export type contractState = Record<string, SignerData>

const NAME = 'signers'
const initialState: contractState = {}

/**
 * Actions
 */

export const initSigners = createAsyncThunk(
  `${NAME}/initSigners
  `,
  async (bulk: contractState) => {
    return bulk
  },
)

export const upsetSigner = createAsyncThunk<
  contractState,
  { address: string; data: SignerData },
  { state: any }
>(`${NAME}/upsetSigner`, async ({ address, data }) => {
  return { [address]: data }
})

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initSigners.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetSigner.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
