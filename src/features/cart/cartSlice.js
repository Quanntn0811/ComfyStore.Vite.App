import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const product = action.payload.product

      // Find product in cart
      const item = state.cartItems.find(
        (item) => item.cartId === product.cartId
      )

      // If exist than increase amount
      if (item) {
        item.amount += product.amount
      }
      // If not exist than add to cart
      else {
        state.cartItems.push(product)
      }

      state.numItemsInCart += product.amount
      state.cartTotal += product.price * product.amount
      cartSlice.caseReducers.calculateTotal(state)
      toast.success('Item added to cart')
    },
    clearCart: (state) => {
      localStorage.setItem('cart', JSON.stringify(defaultState))
      return defaultState
    },
    removeItem: (state, action) => {
      const id = action.payload.id
      const item = state.cartItems.find((item) => item.cartId === id)

      state.cartItems = state.cartItems.filter((item) => item.cartId !== id)
      state.numItemsInCart -= item.amount
      state.cartTotal -= item.price * item.amount
      cartSlice.caseReducers.calculateTotal(state)
      toast.error('Item removed from cart')
    },
    editItem: (state, action) => {
      const { id, amount } = action.payload
      const item = state.cartItems.find((item) => item.cartId === id)
      state.numItemsInCart += amount - item.amount
      state.cartTotal += item.price * (amount - item.amount)
      item.amount = amount

      cartSlice.caseReducers.calculateTotal(state)
      toast.success('Cart updated')
    },
    calculateTotal: (state) => {
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions
export default cartSlice.reducer
