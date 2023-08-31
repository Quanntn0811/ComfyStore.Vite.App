import { redirect, useLoaderData } from 'react-router-dom'
import { ComplexPaginationContainer, SectionTitle } from '../components'
import OrdersList from '../components/OrdersList'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

const queryOrders = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user

    if (!user) {
      toast.warn('You must be logged in to view orders')
      return redirect('/login')
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    try {
      const resp = await queryClient.ensureQueryData(queryOrders(params, user))

      const data = resp.data.data
      const meta = resp.data.meta
      return { data, meta }
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error accessing your orders'
      toast.error(errorMessage)
      if (error?.response?.status === 401 || 403) return redirect('/login')
      return null
    }
  }

const Orders = () => {
  const { meta } = useLoaderData()

  if (meta.pagination.total < 1) {
    return <SectionTitle title="Please make an order"></SectionTitle>
  }

  return (
    <>
      <SectionTitle title="your orders"></SectionTitle>
      <OrdersList></OrdersList>
      <ComplexPaginationContainer></ComplexPaginationContainer>
    </>
  )
}
export default Orders
