import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registration/registrationSlice";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

export default store;
