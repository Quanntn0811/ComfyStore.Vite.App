import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/user/userSlice'
import { clearCart } from '../features/cart/cartSlice'
import { useQueryClient } from '@tanstack/react-query'

const Header = () => {
  const user = useSelector((state) => state.userState.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    navigate('/')
    dispatch(clearCart())
    dispatch(logoutUser())
    queryClient.removeQueries()
  }

  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        {user ? (
          <div className="flex gap-x-6 justify-center items-center">
            {/* Login nav */}
            <p>Hello, {user.user.username}</p>

            {/* Register nav */}
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            {/* Login nav */}
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>

            {/* Register nav */}
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
