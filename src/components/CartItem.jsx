import { useDispatch } from 'react-redux'
import { editItem, removeItem } from '../features/cart/cartSlice'
import { formatPrice } from '../utils'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const id = item.cartId

  const removeItemFromCart = () => {
    dispatch(removeItem({ id }))
  }

  const handleAmount = (e) => {
    dispatch(editItem({ id, amount: parseInt(e.target.value) }))
  }

  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="h-24 w-24 object-cover rounded-lg sm:h-32 sm:w-32"
      />

      {/* Info */}
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{item.title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {item.company}
        </h4>
        <p className="mt-4 capitalize text-sm flex items-center gap-x-2">
          color:{' '}
          <span
            className="badge badge-sm"
            style={{ backgroundColor: item.productColor }}
          ></span>
        </p>
      </div>

      {/* Amount */}
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="capitalize label-text">amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={item.amount}
            onChange={handleAmount}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromCart}
        >
          remove
        </button>
      </div>

      <p className="font-medium sm:ml-auto">{formatPrice(item.price)}</p>
    </article>
  )
}
export default CartItem
