'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';

import expenseReducer from "../slice/expenseSlice";
import expenseSummaryReducer from "../slice/expense.summary.slice";
import recentExpenseReducer from "../slice/recent.expense.slice";
import monthlyExpenseReducer from "../slice/monthlyTrend.slice"
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [], 
};

const rootReducer = combineReducers({
  expenseList : expenseReducer,
  expenseSummary:expenseSummaryReducer,
  recentExpense:recentExpenseReducer,
  monthlyExpense:monthlyExpenseReducer
});

  export type RootState = ReturnType<typeof rootReducer>;

  

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const makeStore = () => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  };

  export type AppStore = ReturnType<typeof makeStore>['store'];
  export type AppDispatch = AppStore['dispatch'];