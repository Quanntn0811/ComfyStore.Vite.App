import { useLoaderData } from 'react-router-dom'
import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils'

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } = queryParams

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch('/products', {
        params: queryParams,
      }),
  }
}
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    const { data } = await queryClient.ensureQueryData(allProductsQuery(params))

    const products = data.data
    const meta = data.meta
    const { search, category, company, price, shipping } = params

    return { products, meta, search, category, company, price, shipping }
  }

const Products = () => {
  const { products } = useLoaderData()

  return (
    <>
      <Filters></Filters>
      <ProductsContainer></ProductsContainer>
      {products.length === 0 ? '' : <PaginationContainer></PaginationContainer>}
    </>
  )
}
export default Products
