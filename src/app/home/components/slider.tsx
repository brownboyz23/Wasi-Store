"use client"
import './css/products.css'
import '../../mainCss/main.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

interface products {
  image: string,
  name: string,
  price: string,
  desc: string,
  category: string,
  id?: string
}

const SliderPage = () => {

  const [products, setProducts] = useState<products[]>([])

  const router = useRouter()


  // const [firebase] = useState("")


  useEffect(() => {
    const addpProducts = async () => {
      try {
        const AddData = await getDocs(collection(db, "products"))
        const data = AddData.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as products)
        }))
        setProducts(data)
      } catch (error) {
        console.error('There is an Error', error)
        alert('Something Wents to Wrong')
      }
    }
    addpProducts()
  }, [])



  const HandleBuyNow = async (ProductsId: products) => {
    try {
      await addDoc(collection(db, 'orders'), {
        image: ProductsId.image,
        name: ProductsId.name,
        price: ProductsId.price,
        desc: ProductsId.desc,
        date: new Date(),
        status: 'pending'
      })
      router.push('./Dashboard/buyingdashboard/')
    } catch (error) {
      console.error('There is an Erorr', error)
      alert("Something Wents to Wrong")
    }
  }


  const filtered = products.filter((curEl) => {
    return curEl.category === "Slider"
  })

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] h-min-screen mx-auto mt-20 mb-30 ">
      <Swiper
        loop={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        slidesPerView={4}
        slidesPerGroup={1}
        loopAdditionalSlides={4}
        spaceBetween={4}
        effect='fade'
        className='w-[1500px]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 '
      >
        {products && (
          <div className=''>
            {filtered.map((items, index) => (
              <SwiperSlide key={index} className=' basis-1/4  '>
                <div className='relative  h-[200px] slidProx'>
                  <img
                    src={items.image}
                    alt=''
                    className='w-full h-[180px] rounded'
                  />
                  <div className=' absolute inset-0 bg-black/30 h-[180px] rounded-xs'>
                    <h1 className='text-xl langugP6  text-white ms-1'>{items.name}</h1>
                  </div>
                  <div className='hidden'>
                    {items.desc}
                  </div>
                  <div className='w-full relative slidproxs'>
                    <Button className='border-1 slidbtn ' onClick={() => HandleBuyNow(items)}>
                      Buy Now
                    </Button>
                  </div>
                </div>
              </SwiperSlide>

            ))
            }
          </div>
        )
        }
      </Swiper>
    </div>
  )
}

export default SliderPage
