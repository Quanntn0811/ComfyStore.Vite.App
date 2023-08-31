import { useLoaderData } from 'react-router-dom'
import ProductsList from './ProductsList'
import ProductsGrid from './ProductsGrid'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import { useState } from 'react'

const style = {
  grid: 'grid',
  list: 'list',
}

const ProductsContainer = () => {
  const { meta } = useLoaderData()
  const totalProduct = meta.pagination.total
  const [activeStyled, setActiveStyled] = useState(style.grid)

  const handleActiveStyled = () => {
    const newStyle = activeStyled === style.grid ? style.list : style.grid
    setActiveStyled(newStyle)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mt-8 border-b pb-5 border-base-300">
        <h4 className="font-medium text-lg">
          {totalProduct} Product{totalProduct ? 's' : ''}
        </h4>
        <div className="flex gap-x-2">
          <button
            className={`text-xl btn btn-circle btn-sm ${
              activeStyled === style.grid
                ? 'btn-primary text-primary-content'
                : 'btn-ghost text-base-content'
            }`}
            onClick={handleActiveStyled}
          >
            <BsFillGridFill></BsFillGridFill>
          </button>
          <button
            className={`text-xl btn btn-circle btn-sm ${
              activeStyled === style.list
                ? 'btn-primary text-primary-content'
                : 'btn-ghost text-base-content'
            }`}
            onClick={handleActiveStyled}
          >
            <BsList></BsList>
          </button>
        </div>
      </div>

      {/* List products */}
      <div>
        {totalProduct ? (
          activeStyled === style.grid ? (
            <ProductsGrid></ProductsGrid>
          ) : (
            <ProductsList></ProductsList>
          )
        ) : (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        )}
      </div>
    </div>
  )
}
export default ProductsContainer
