import React from "react";
import ProductInCart from "../ProductInCart";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";
import { closeBasket } from "../../store/cart/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import "./index.css";

interface propsFromState {
  cartItems: Cart;
}

interface propsFromDispatch {
  closeBasket: () => void;
}

type AllProps = propsFromState & propsFromDispatch;
let subtotal: number;
let tax: number;
let shipping: number;
let total: number;

const CartComponent: React.FC<AllProps> = ({ cartItems, closeBasket }) => {
  
  if (localStorage.length !== 0) {
    subtotal = localStorage.subtotal
  }
  subtotal = 0;
  tax = 100;
  shipping = 150;
  total = 0;

  for (let i = 0; i < cartItems.items.length; i++) {
    subtotal =
      subtotal +
      +cartItems.items[i].price * cartItems.count[+cartItems.items[i].id];
    total = subtotal + tax + shipping;
  }

  return (
      <div className="basket">
        <div className="cart-header-div">
          <h2 className="basket-h2">My basket</h2>
        </div>
        <div className="cart-list-div">
          {cartItems.items.map((item) => {
            return (
                <ProductInCart item={item} cartItems={cartItems} key={item.name} />
            );
          })}
        </div>
        {subtotal ? (
          <>
            <div className="cart-hr" />
            <div className="total">
              <div className="total-name">
                <span>Subtotal</span>
                <span>Tax</span>
                <span>Shipping</span>
                <span className="total-title">Total</span>
              </div>
              <div className="total-value">
                <span>$ {subtotal}</span>
                <span>$ {tax}</span>
                <span>$ {shipping}</span>
                <span className="total-title">$ {total}</span>
              </div>
            </div>
          </>
        ) : null}
      </div>
  );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
  cartItems: cart.data,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    closeBasket: () => dispatch(closeBasket())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
