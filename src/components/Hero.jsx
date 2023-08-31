import { Link } from 'react-router-dom'
import hero1 from '../assets/hero1.webp'
import hero2 from '../assets/hero2.webp'
import hero3 from '../assets/hero3.webp'
import hero4 from '../assets/hero4.webp'
import { useEffect, useState } from 'react'

const carouselImages = [hero1, hero2, hero3, hero4]

const Hero = () => {
  //   const [currentIndex, setCurrentIndex] = useState(0)

  //   useEffect(() => {
  //     setInterval(() => {
  //       setCurrentIndex((curr) => {
  //         curr = (currentIndex + 1) % carouselImages.length
  //         return curr
  //       })
  //     }, 2000)
  //   }, [currentIndex])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      {/* Hero left */}
      <div>
        {/* Title */}
        <h1 className="max-w-2xl text-4xl font-bold">
          We are changing the way people shop
        </h1>

        {/* Text */}
        <p className="mt-8 max-w-xl text-lg leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, fugiat
          vero! A veritatis quibusdam perferendis obcaecati? Expedita repellat
          sunt praesentium.
        </p>

        {/* Products nav */}
        <div className="mt-10">
          <Link to="/products" className="btn btn-primary">
            our product
          </Link>
        </div>
      </div>

      {/* Hero right */}
      <div className="h-[28rem] hidden lg:carousel carousel-center p-4 space-x-4 bg-neutral">
        {carouselImages.map((image, index) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                alt=""
                className="rounded-box h-full w-80 object-cover"
                // style={{
                //   transform: `translateX(${100 * (index - currentIndex)}px)`,
                // }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default Hero
