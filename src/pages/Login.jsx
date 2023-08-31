import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { useDispatch } from 'react-redux'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      const resp = await customFetch.post('/auth/local', data)
      const user = resp.data

      store.dispatch(loginUser({ user }))
      toast.success('logged in successfully')
      return redirect('/')
    } catch (error) {
      console.log(error)
      const message =
        error?.response?.data?.error?.message ||
        'please double check your credentials'
      toast.error(message)
      return null
    }
  }

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginAsGuestUser = async () => {
    try {
      const resp = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      })

      const user = resp.data
      dispatch(loginUser({ user }))
      toast.success('welcome guest user')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('guest user login error.please try later.')
    }
  }

  return (
    <section
      className=" grid place-items-center"
      style={{ height: `100vh - 104px` }}
    >
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        {/* Title */}
        <h4 className="text-center text-3xl font-bold">Login</h4>

        {/* Email input  */}
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="quansucno@gmail.com"
        />

        {/* Password input */}
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="123456"
        />

        {/* Login btn */}
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        {/* Guest user */}
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>

        {/* Register nav */}
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Login
