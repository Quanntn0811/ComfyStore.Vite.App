import { Outlet, useNavigation } from 'react-router-dom'
import { Header, Loading, Navbar } from '../components'

const HomeLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <>
      <Header></Header>
      <Navbar></Navbar>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <section className="align-element py-20">
          <Outlet></Outlet>{' '}
        </section>
      )}
    </>
  )
}
export default HomeLayout
