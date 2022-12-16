import { configureStore } from '@reduxjs/toolkit'

import contracts from './contracts.controller'
import signers from './signers.controller'
import users from './users.controller'

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
  reducer: { contracts, signers, users },
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
