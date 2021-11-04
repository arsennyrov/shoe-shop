import { Inventory } from "../inventory/types";

export interface Cart {
  id: number;
  count: number[];
  items: Inventory[];
}




export enum CartActionTypes {
  ADD_TO_CART = "@@cart/ADD_TO_CART",
  ADD_TO_CART_FAILURE = "@@cart/ADD_TO_CART_FAILURE",
  ADD_TO_COUNT = "@@cart/ADD_TO_CART_SVG",
  DEC_FROM_CART = "@@cart/DEC_FROM_CART",
  DEC_FROM_CART_FAILURE = "@@cart/DEC_FROM_CART_FAILURE",
  DEL_FROM_CART = "@@cart/DEL_FROM_CART",
  DEL_FROM_CART_FAILURE = "@@cart/DEL_FROM_CART_FAILURE",
  REMOVE_FROM_CART = "@@cart/REMOVE_FROM_CART",
  FETCH_CART_REQUEST = "@@cart/FETCH_CART_REQUEST",
  FETCH_CART_SUCCESS = "@@cart/FETCH_CART_SUCCESS",
  FETCH_CART_ERROR = "@@cart/FETCH_CART_ERROR",
  OPEN_MENU = "@@cart/OPEN_MENU",
  CLOSE_MENU = "@@cart/CLOSE_MENU"
}

export interface cartState {
  basketOpen: boolean;
  readonly loading: boolean;
  data: Cart;
  readonly errors?: string;
}
