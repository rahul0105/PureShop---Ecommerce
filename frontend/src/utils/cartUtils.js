export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //calculate item price:
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //calculate the shipping price: (if price of item is over or equal to $100 the free else $10)
  state.shippingPrice = addDecimal(state.itemsPrice >= 100 ? 0 : 100);

  //calculate tax price:(18%)
  state.taxPrice = addDecimal(Number(0.18 * state.itemsPrice).toFixed(2));

  //calculate total price:
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("Cart", JSON.stringify(state));

  return state;
};
