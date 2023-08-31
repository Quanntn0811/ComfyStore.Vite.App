import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { numItemsInCart } = useSelector((store) => store.cartState)
  const { user } = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  if (numItemsInCart === 0) {
    return <SectionTitle title="your cart is empty"></SectionTitle>
  }

  return (
    <>
      <SectionTitle title={'Shopping cart'}></SectionTitle>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList></CartItemsList>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals></CartTotals>
          {user ? (
            <Link to="/checkout" className="btn btn-block mt-8 btn-primary">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-block mt-8 btn-primary">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
export default Cart
