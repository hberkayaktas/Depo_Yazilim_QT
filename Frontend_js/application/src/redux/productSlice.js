
//http://localhost:3000/products?page=2
//http://localhost:3000/products
//http://localhost:3000/3

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//const char_limit = 12;
export const fetchProducts = createAsyncThunk('characters/getCharacters',async (page) => {
      const res = await axios(`http://localhost:5000/products?page=${page}`);
      //console.log(res.data);
      return res.data;
})

export const productsSlice = createSlice ({
      name:'characters',
      initialState: {
            persons:[],
            status: "idle",
            page:1,
            hasNextPage : true,
      },
      reducers:{},
      extraReducers:{
            [fetchProducts.pending]: (state,action) =>{
                  state.status = "loading";
            },
            [fetchProducts.fulfilled]:(state,action) => {
                  //console.log(action.payload.products)
                  state.persons = [...state.persons,...action.payload.products];
                  state.status ="succeeded";
                  state.page +=1;
                  if(action.payload.products.length < 10){
                        state.hasNextPage = false;
                  }
            },
            [fetchProducts.rejected]:(state,action) => {
                  state.isLoading ="failed";
                  state.error = action.error.message;
            },
      },
});


export default productsSlice.reducer;