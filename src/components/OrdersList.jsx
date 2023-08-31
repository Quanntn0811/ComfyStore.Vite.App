import dayjs from 'dayjs'
import { useLoaderData } from 'react-router-dom'

const OrdersList = () => {
  const { data, meta } = useLoaderData()
  const { total } = meta.pagination

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">total orders : {total}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => {
              const { address, name, orderTotal, numItemsInCart, createdAt } =
                order.attributes

              const date = dayjs(createdAt).format('hh:mm a - MMM D, YYYY')
              return (
                <tr key={order.id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default OrdersList
