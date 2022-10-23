import { createAsyncThunk,createSlice,PayloadAction  } from '@reduxjs/toolkit';
//import type { RootState } from './store';
import axios from "axios";
import ProductTypes from '../../models/Productmodels';

// APİ  uçları  
//http://localhost:5000/products?page=2
//http://localhost:5000/products
//http://localhost:5000/3

//const API_BAGLANTISI = "http://localhost:5000/products?page=";

// ACTION
export const fetchProducts = createAsyncThunk("products/fetchProducts", 
      async (page:number, thunkApi)=> {
            try{
                  const response = await axios.get<ProductTypes[] | ProductTypes>(`http://localhost:5000/products?page=${page}`);
                  return response.data;
            }catch(error:any){
                  return thunkApi.rejectWithValue(error.message);
            }
      }
);
//state tipleri
interface ProductState {
      product: null | ProductTypes[]  ;
      status :null | string ;
      page : number ;
      hasNextPage: boolean ;
      error: null | string | any;
      isLoading:string;
}

//boş state ler
const initialState = {
      hasNextPage : true,
      product:null,
      status: "idle",
      page:1,
} as ProductState;

// Slice
const productsSlice = createSlice({
      name: "product",
      initialState,
      reducers: {},
      extraReducers(builder) {
            builder
                  .addCase(fetchProducts.pending, (state, action:PayloadAction<any>) => {
                        state.status = "loading";
                  })
                  .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductTypes[] | ProductTypes | any>) => {
                        // any nin olduğu yede bir tip tanımlaması daha yapılacak objeyi görmüyor
                        

                        //console.log(action.payload.products)
                              if(state.product != null) {
                                    state.product = [...state.product,...action.payload.products];
                              }else{
                                    state.product = [...action.payload.products];
                              }
                        
                        state.status ="succeeded";
                        state.page +=1;
                        if(action.payload.products.length < 10){
                              state.hasNextPage = false;
                        }
                  })
                  .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                       // state.isLoading ="failed";
                       // state.error = action.error.message;
                  });
            }
});


export default productsSlice.reducer;