import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductItem from "../ProductItem";
import { ApplicationState } from "../../store";
import { Inventory } from "../../store/inventory/types";
import { fetchRequest } from "../../store/inventory/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import CartComponent from "../Cart";
import { closeBasket } from "../../store/cart/action";

import "./index.css";

interface PropsFromState {
  loading: boolean;
  data: Inventory[];
  errors?: string;
  basketOpen: boolean;
}
interface propsFromDispatch {
  fetchRequest: () => any;
  closeBasket: () => void;
}

type AllProps = PropsFromState & propsFromDispatch;

const HomePage: React.FC<AllProps> = ({
  loading,
  errors,
  data,
  fetchRequest,
  basketOpen,
  closeBasket,
}) => {
  useEffect(() => {
    fetchRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="product-list-items">
        <div className="lists-wrapper">
          <div className="lists">
            {data.map((item) => {
              return <ProductItem key={item.name} item={item} />;
            })}
          </div>
        </div>
        <div className="cart-sidebar">
          <CartComponent />
        </div>
        {basketOpen && (
          <div className="cart-menu">
            <div className="cart-close-wrapper">
              <svg
                className="svg-close-basket"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={closeBasket}
              >
                <rect
                  x="0.460205"
                  y="20.5061"
                  width="29"
                  height="2"
                  transform="rotate(-45 0.460205 20.5061)"
                  fill="black"
                />
                <rect
                  x="1.41431"
                  y="0.0398254"
                  width="29"
                  height="2"
                  transform="rotate(45 1.41431 0.0398254)"
                  fill="black"
                />
              </svg>
            </div>
            <CartComponent />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ inventory, cart }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data,
  basketOpen: cart.basketOpen,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchRequest: () => {
      dispatch(fetchRequest());
    },
    closeBasket: () => dispatch(closeBasket()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
