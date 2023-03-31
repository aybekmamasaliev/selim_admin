import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { accountsApi } from './apis/accountsApi'
import { mainInfoApi } from './apis/mainInfoApi'
import { appSelimApi } from './apis/appSelim'
import authSlice from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    accounts: accountsApi,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [mainInfoApi.reducerPath]: mainInfoApi.reducer,
    [appSelimApi.reducerPath]: appSelimApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      accountsApi.middleware,
      mainInfoApi.middleware,
      appSelimApi.middleware,
    )
  },
})

setupListeners(store.dispatch)

export { store }
