import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";
import { RootState } from "../store";
import { addItemsToShoppingCart } from "../../utils/functions";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

interface CartState {
  cartProducts: IProduct[];
}

const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      // state.cartProducts = [...state.cartProducts, action.payload];
      state.cartProducts = addItemsToShoppingCart(
        state.cartProducts,
        action.payload
      );
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
      toast({
        title:"Removed from your cart" ,
        status: "success",
        isClosable: true,
        duration:2000
      });
    },
    clearCart(state) {
      state.cartProducts = [];
      toast({
        title: "Your cart is empty now",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartSelector = ({ cart }: RootState) => cart;

export default cartSlice.reducer;
