import ProductsGrid from './ProductsGrid'
import SectionTitle from './SectionTitle'

const FeaturedProducts = () => {
  return (
    <section className="pt-24">
      <SectionTitle title={'Featured Products'}></SectionTitle>
      <ProductsGrid></ProductsGrid>
    </section>
  )
}
export default FeaturedProducts
