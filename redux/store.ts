import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/slices/themeSlice";
import tasksReducer from "@/slices/tasksSlice";
import productReducer from "@/slices/productSlice";
export const store=configureStore({
    reducer:{
        theme:themeReducer,
        tasks: tasksReducer,
        products:productReducer
    }
})