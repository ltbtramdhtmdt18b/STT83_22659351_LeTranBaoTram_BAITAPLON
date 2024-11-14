import {
  REMOVE_ITEM,
  ADD_TO_CART,
  INCREASE,
  DECREASE,
  CHECKOUT,
  CLEAR,
} from "./CartTypes.js";

// Save the cartItems to local storage
const Storage = (cartItems) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

// Export function to calculate the total price of the cart and the total quantity of the cart
export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

// The reducer is listening for an action, which is the type that we defined in the CartTypes.js file
const CartReducer = (state, action) => {
  // The switch statement is checking the type of action that is being passed in
  switch (action.type) {
    // If the action type is ADD_TO_CART, we want to add the item to the cartItems array
    case ADD_TO_CART:
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    // If the action type is REMOVE_ITEM, we want to remove the item from the cartItems array
    case REMOVE_ITEM:
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };

    // If the action type is INCREASE, we want to increase the quantity of the particular item in the cartItems array
    case INCREASE:
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 }; // Tăng số lượng một cách an toàn
        }
        return item;
      });
      return {
        ...state,
        cartItems: updatedCartItems, // Trả về cartItems đã được sao chép và cập nhật
        ...sumItems(updatedCartItems),
      };

    // If the action type is DECREASE, we want to decrease the quantity of the particular item in the cartItems array
    case DECREASE:
      const updatedCartItems2 = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1, // Giảm số lượng, nhưng không thấp hơn 1
          };
        }
        return item;
      });
      return {
        ...state,
        cartItems: updatedCartItems2, // Trả về cartItems đã được sao chép và cập nhật
        ...sumItems(updatedCartItems2),
      };

    // If the action type is CHECKOUT, we want to clear the cartItems array and set the checkout to true
    case CHECKOUT:
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };

    //If the action type is CLEAR, we want to clear the cartItems array
    case CLEAR:
      return {
        cartItems: [],
        ...sumItems([]),
      };

    //Return the state if the action type is not found
    default:
      return state;
  }
};

export default CartReducer;
