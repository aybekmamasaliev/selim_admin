import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { accountsApi } from './apis/accountsApi'
import { mainInfoApi } from './apis/mainInfoApi'
import authSlice from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    accounts: accountsApi,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [mainInfoApi.reducerPath]: mainInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      accountsApi.middleware,
      mainInfoApi.middleware,
    )
  },
})

setupListeners(store.dispatch)

export { store }
