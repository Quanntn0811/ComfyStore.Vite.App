import { useSelector } from 'react-redux'
import { CartTotals, FormInput, SectionTitle, SubmitBtn } from '../components'
import { Form, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch, formatPrice } from '../utils'
import { clearCart } from '../features/cart/cartSlice'

export const loader = (store) => async () => {
  const user = store.getState().userState.user

  if (!user) {
    toast.warn('You must be logged in to checkout')
    return redirect('/login')
  }

  return null
}

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const { name, address } = Object.fromEntries(formData)
    const user = store.getState().userState.user

    const { cartItems, numItemsInCart, orderTotal } = store.getState().cartState

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    }

    try {
      const resp = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )

      // remove query
      queryClient.removeQueries(['orders'])

      store.dispatch(clearCart())
      toast.success('order placed successfully')
      return redirect('/orders')
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message ||
        'There was an error placing your order'

      toast.error(errorMessage)

      if (error?.response?.status === 401 || 403) return redirect('/login')
      return null
    }
  }

const Checkout = () => {
  const { cartTotal } = useSelector((state) => state.cartState)

  if (cartTotal === 0) {
    return <SectionTitle title="your cart is empty"></SectionTitle>
  }

  return (
    <>
      <SectionTitle title="Place your order"></SectionTitle>
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <Form method="post" className="flex flex-col gap-y-4">
          <h4 className="font-medium text-xl capitalize mb-3">
            Shipping information
          </h4>
          <FormInput type="text" label="First Name" name="name"></FormInput>
          <FormInput type="text" label="address" name="address"></FormInput>
          <div className="mt-4">
            <SubmitBtn text="place your order"></SubmitBtn>
          </div>
        </Form>
        <CartTotals></CartTotals>
      </div>
    </>
  )
}
export default Checkout
