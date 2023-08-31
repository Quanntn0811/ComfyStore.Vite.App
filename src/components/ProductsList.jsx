import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'

const ProductsList = () => {
  const { products } = useLoaderData()

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { image, title, price, company } = product.attributes
        const dollarFormatted = formatPrice(price)
        return (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row bg-base-100 shadow-xl gap-y-4 hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32 group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize text-neutral-content">{company}</h4>
            </div>
            <p className="font-medium text-lg ml-0 sm:ml-auto">
              {dollarFormatted}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
export default ProductsList
