import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages/index'

// loaders
import { ErrorElement } from './components'
import { loader as landingLoader } from './pages/Landing'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as allProductLoader } from './pages/Products'
import { loader as checkOutLoader } from './pages/Checkout'
import { loader as ordersLoader } from './pages/Orders'

// actions
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as checkOutAction } from './pages/Checkout'
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const rout = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        loader: landingLoader(queryClient),
        errorElement: <ErrorElement></ErrorElement>,
      },
      {
        path: 'about',
        element: <About></About>,
      },
      {
        path: 'products',
        element: <Products></Products>,
        loader: allProductLoader(queryClient),
      },
      {
        path: 'product/:id',
        element: <SingleProduct></SingleProduct>,
        loader: singleProductLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart></Cart>,
      },
      {
        path: 'checkout',
        element: <Checkout></Checkout>,
        loader: checkOutLoader(store),
        action: checkOutAction(store, queryClient),
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: ordersLoader(store, queryClient),
      },
      {
        path: '/login',
        element: <Login></Login>,
        action: loginAction(store),
      },
      {
        path: '/register',
        element: <Register></Register>,
        action: registerAction,
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={rout}></RouterProvider>
    </QueryClientProvider>
  )
}
export default App
