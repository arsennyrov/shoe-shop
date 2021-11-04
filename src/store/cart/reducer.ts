import { Reducer } from "redux";
import { CartActionTypes, cartState } from "./types";

export const initialState: cartState = {
  data: {
    id: 0,
    count: [0, 0, 0, 0, 0, 0],
    items: [],
  },
  errors: undefined,
  loading: false,
  basketOpen: false,
};

const reducer: Reducer<cartState> = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.FETCH_CART_REQUEST: {
      return { ...state, loading: true };
    }
    case CartActionTypes.FETCH_CART_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case CartActionTypes.FETCH_CART_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }

    case CartActionTypes.ADD_TO_CART: {
      const newState = {...state, data:{...state.data}}

      if (state.data.items.length === 0) {
        newState.data.count = [0,0,0,0,0,0];  
      }
      newState.data.id = action.payload.id;
      newState.data.count[action.payload.id] = newState.data.count[action.payload.id] + 1;
      return {
        basketOpen: newState.basketOpen,
        errors: newState.errors,
        loading: newState.loading,
        count: newState.data.count,
        data: !(newState.data.items.find((item) => item.id === action.payload.id )) ? {
          ...newState.data,
          items: [...newState.data.items, action.payload]
        } :
          {
            ...newState.data,
            items: [...newState.data.items]
          }
      };
    }

    // eslint-disable-next-line no-lone-blocks
    case CartActionTypes.ADD_TO_COUNT: {
      const newState = {...state, data:{...state.data}}
      newState.data.id = action.payload.id;
      //state.data.count[action.payload.id] = state.data.count[action.payload.id] + 1;
      return { ...newState };
    };
    // eslint-disable-next-line no-lone-blocks
    case CartActionTypes.OPEN_MENU: {
      const newState = {...state, basketOpen: true}
      return { ...newState };
    };
    // eslint-disable-next-line no-lone-blocks
    case CartActionTypes.CLOSE_MENU: {
      const newState = {...state, basketOpen: false}
      return { ...newState };
    };
    // eslint-disable-next-line no-lone-blocks
    case CartActionTypes.DEC_FROM_CART: {
      const newState = {...state, data:{...state.data}}
      newState.data.id = action.payload.id;
      if (newState.data.count[action.payload.id] > 0)
        newState.data.count[action.payload.id] = newState.data.count[action.payload.id] - 1;
      return {
        basketOpen: newState.basketOpen,
        errors: newState.errors,
        loading: newState.loading,
        count: newState.data.count,
        data: {
            ...newState.data,
            items: [...newState.data.items]
          }
      };
    }

    // eslint-disable-next-line no-lone-blocks
    case CartActionTypes.DEL_FROM_CART: {
      const newState = {...state, data:{...state.data, count: [...state.data.count]}}
      newState.data.count[action.payload.id] = 0;
      let itemsIndex = newState.data.items.findIndex((item,index) => item.id === action.payload.id);
      return {
        basketOpen: newState.basketOpen,
        errors: newState.errors,
        loading: newState.loading,

        count: newState.data.count,
        data: (newState.data.items.length < 2)  ? 
        {
          ...newState.data,
          items: []
        }
        :
          {
            ...newState.data,
            items: [...newState.data.items.slice(0, itemsIndex), 
                    ...newState.data.items.slice(1+ itemsIndex)]
          }
      };
    }

    default: {
      return state;
    }
  }
};

export { reducer as cartReducer };
