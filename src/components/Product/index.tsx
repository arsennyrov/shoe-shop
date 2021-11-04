import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Inventory } from "../../store/inventory/types";
import { addToCart, closeBasket } from "../../store/cart/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Link, useParams } from "react-router-dom";
import CartComponent from "../Cart";

import "./index.css";

interface propsFromComponent {
  loading: boolean;
  data: Inventory[];
  errors?: string;
  basketOpen: boolean;
}

interface propsFromDispatch {
  addToCart: (item: any) => any;
  closeBasket: () => void;
}

type Props = propsFromComponent & propsFromDispatch;

const Product: React.FC<Props> = ({
  data,
  addToCart,
  basketOpen,
  closeBasket,
}) => {
  const { name } = useParams();

  const currentProduct = data.filter((item) => {
    return item.name === name;
  });
  const AddItemToCart = (item: any) => {
    addToCart(item);
  };

  return (
    <div className="product-list-items">
      <div className="item-wrapper">
        <div className="item">
          <Link to="/" type="button" className="item-link">
            Back in catalog
          </Link>
          <img
            className="item-img"
            src={currentProduct[0] ? currentProduct[0].image : ""}
            alt="item"
          />
          <div className="item-title-wrapper">
            <span className="item-title">
              {currentProduct[0] ? currentProduct[0].name : null}
            </span>
            <span className="item-title-number">
              Item model number:{" "}
              {currentProduct[0] ? currentProduct[0].modelNumber : null}
            </span>
            <div className="item-price-wrapper">
              <div
                className="add-to-cart"
                onClick={() => AddItemToCart(currentProduct[0])}
              >
                <svg
                  className="icon-addtocart"
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                  fill="blue"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 16.5C19.0625 16.5 19.3555 16.5586 19.6289 16.6758C19.9023 16.793 20.1406 16.9531 20.3438 17.1562C20.5469 17.3594 20.707 17.5977 20.8242 17.8711C20.9414 18.1445 21 18.4375 21 18.75C21 19.0625 20.9414 19.3555 20.8242 19.6289C20.707 19.9023 20.5469 20.1406 20.3438 20.3438C20.1406 20.5469 19.9023 20.707 19.6289 20.8242C19.3555 20.9414 19.0625 21 18.75 21C18.4375 21 18.1445 20.9414 17.8711 20.8242C17.5977 20.707 17.3594 20.5469 17.1562 20.3438C16.9531 20.1406 16.793 19.9023 16.6758 19.6289C16.5586 19.3555 16.5 19.0625 16.5 18.75C16.5 18.5078 16.543 18.2578 16.6289 18H10.3711C10.457 18.2578 10.5 18.5078 10.5 18.75C10.5 19.0625 10.4414 19.3555 10.3242 19.6289C10.207 19.9023 10.0469 20.1406 9.84375 20.3438C9.64062 20.5469 9.40234 20.707 9.12891 20.8242C8.85547 20.9414 8.5625 21 8.25 21C7.9375 21 7.64453 20.9414 7.37109 20.8242C7.09766 20.707 6.85938 20.5469 6.65625 20.3438C6.45312 20.1406 6.29297 19.9023 6.17578 19.6289C6.05859 19.3555 6 19.0625 6 18.75C6 18.3203 6.11328 17.9219 6.33984 17.5547C6.56641 17.1875 6.87891 16.9102 7.27734 16.7227L2.21484 1.5H0V0H3.29297L4.28906 3H24L20.5078 13.5H7.79297L8.78906 16.5H18.75ZM4.79297 4.5L7.28906 12H19.418L21.9141 4.5H4.79297ZM9 18.75C9 18.5469 8.92578 18.3711 8.77734 18.2227C8.62891 18.0742 8.45312 18 8.25 18C8.04688 18 7.87109 18.0742 7.72266 18.2227C7.57422 18.3711 7.5 18.5469 7.5 18.75C7.5 18.9531 7.57422 19.1289 7.72266 19.2773C7.87109 19.4258 8.04688 19.5 8.25 19.5C8.45312 19.5 8.62891 19.4258 8.77734 19.2773C8.92578 19.1289 9 18.9531 9 18.75ZM18.75 19.5C18.9531 19.5 19.1289 19.4258 19.2773 19.2773C19.4258 19.1289 19.5 18.9531 19.5 18.75C19.5 18.5469 19.4258 18.3711 19.2773 18.2227C19.1289 18.0742 18.9531 18 18.75 18C18.5469 18 18.3711 18.0742 18.2227 18.2227C18.0742 18.3711 18 18.5469 18 18.75C18 18.9531 18.0742 19.1289 18.2227 19.2773C18.3711 19.4258 18.5469 19.5 18.75 19.5Z"
                    fill="white"
                  />
                </svg>
              </div>

              <span className="item-price">
                $ {currentProduct[0] ? currentProduct[0].price : null}
              </span>
            </div>
          </div>
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
  );
};

const mapStateToProps = ({ cart, inventory }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data,
  basketOpen: cart.basketOpen,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addToCart: (item: any) => dispatch(addToCart(item)),
    closeBasket: () => dispatch(closeBasket()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
