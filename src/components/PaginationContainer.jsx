import { Form, useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { meta } = useLoaderData()
  const { pageCount, page } = meta.pagination
  const pages = []
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  const { pathname, search } = useLocation()
  const navigate = useNavigate()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    console.log(pathname)
    console.log(search)
    console.log(searchParams.toString())
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>
        {pages.map((pageNum) => {
          return (
            <button
              key={pageNum}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNum === page ? 'bg-base-300 border-base-300' : ''
              }`}
              onClick={() => {
                handlePageChange(pageNum)
              }}
            >
              {pageNum}
            </button>
          )
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer
