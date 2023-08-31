import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'

const ProductsGrid = () => {
  const { products } = useLoaderData()

  return (
    <div className="pt-12 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { id, attributes } = product
        const dollarsAmount = formatPrice(attributes.price)
        return (
          <Link
            key={id}
            to={`/product/${id}`}
            className="card w-full  shadow-xl hover:shadow-2xl transition duration-300 "
          >
            <figure className="px-4 pt-4">
              <img
                src={attributes.image}
                alt={attributes.title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">
                {attributes.title}
              </h2>
              <span className="text-secondary">{dollarsAmount}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductsGrid
