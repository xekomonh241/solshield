import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Store constructor
 */
export type UserData = {
  name: {
    first: string
    last: string
    title: string
  }
  phone: string
  email: string
  location: {
    country: string
  }
  nat: string
  picture: {
    thumbnail: string
  }
}

export type userState = Record<string, UserData>

const NAME = 'users'
const initialState: userState = {}

/**
 * Actions
 */

export const initUsers = createAsyncThunk(
  `${NAME}/initUsers
  `,
  async () => {
    const data = await fetch('https://randomuser.me/api/?results=500').then(
      (data) => data.json(),
    )
    const arrayData = data.results
    let result: any = {}
    for (let i = 0; i < arrayData.length; i++) {
      result[i] = arrayData[i]
    }
    return result
  },
)

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(initUsers.fulfilled, (state, { payload }) => payload),
})

export default slice.reducer
