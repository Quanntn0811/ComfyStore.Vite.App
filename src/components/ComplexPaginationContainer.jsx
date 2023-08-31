import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData()
  const { pageCount, page } = meta.pagination
  const { pathname, search } = useLocation()
  const navigate = useNavigate()

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNum)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300 ' : ''
        }`}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []
    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }))

    // dots
    if (page > 2) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      )
    }

    // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }))
    }
    // dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      )
    }

    // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    )

    return pageButtons
  }

  if (pageCount < 2) return null

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            const prePage = page === 1 ? page : page - 1
            handlePageChange(prePage)
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            const nextPage = page === pageCount ? page : page + 1
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default ComplexPaginationContainer
