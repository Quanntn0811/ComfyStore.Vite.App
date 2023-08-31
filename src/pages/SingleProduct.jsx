import { Link, useLoaderData } from 'react-router-dom'
import { customFetch, formatPrice } from '../utils'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`products/${id}`),
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params.id
    const { data } = await queryClient.ensureQueryData(singleProductQuery(id))
    return data.data
  }

const SingleProduct = () => {
  const product = useLoaderData()
  const { title, company, description, image, price, colors } =
    product.attributes
  const dollarFormatted = formatPrice(price)

  const [productColor, setProductColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)

  const dispatch = useDispatch()

  const cartProduct = {
    cartId: product.id + productColor,
    productId: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  }

  const handleAmount = (e) => {
    const newAmount = parseInt(e.target.value)
    setAmount(newAmount)
  }

  return (
    <section>
      {/* Breadcrumbs */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* Product section */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />

        {/* Info */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          <p className="mt-3 text-xl">{dollarFormatted}</p>

          <p className="mt-6 leading-8">{description}</p>

          {/* Colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                )
              })}
            </div>
          </div>

          {/* Amount */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          {/* Cart button */}
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md"
              onClick={() => dispatch(addItem({ product: cartProduct }))}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SingleProduct
