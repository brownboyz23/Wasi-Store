"use client"
import './css/products.css'
import '../../mainCss/main.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import SliderUp from '@/app/mainComp/slidrUp';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

interface products {
  image: string,
  name: string,
  price: string,
  desc: string,
  category: string,
}

const SliderPage = () => {

  const [products, setProducts] = useState<products[]>([])
  const [loading, setLoading] = useState(true)
  const [upslider, setSliders] = useState<products[] | null>(null)
  // const [selectpro, setSelectPro] = useState<products[] | null>(null)

  const router = useRouter()

  useEffect(() => {
    const addpProducts = onSnapshot(collection(db, "products"), (snapshot) => {

      const AddData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as products)
      }))
      setProducts(AddData)
      setLoading(false)
    }, (error) => {
      console.error('There is an Error', error)
      alert('Something Wents to Wrong')
    })
    return () => addpProducts()
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


  if (loading) return <h1 className='mt-10 text-center text-2xl semibold tracking-wider animate-pulse'>
    <span className='animate-ping inline-block  ml-1'>Loading...</span>
  </h1>

  return (
    <div className='flex justify-center items-center'>
      <main>
        {
          <div className='w-full h-[100px]   flex justify-center'>
            <div className=' absolute left top-1 z-99'>
              <SliderUp ProCardx={upslider}
                productXs={(item: products) => setSliders([item])}
              />
            </div>
          </div>
        }
      </main>
      <div className="relative  w-screen left-1/2 right-1/2 -ml-[50vw] h-min-screen mx-auto mt-20 mb-30">
        <Swiper
          loop={true}
          modules={[EffectCoverflow, Autoplay]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          slidesPerView={5}
          slidesPerGroup={1}
          loopAdditionalSlides={4}
          spaceBetween={2}
          effect='coverflow'
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          className='w-[2200px]  h-[280px] slidProx  overflow-visible '
        >
          {products && (
            <div className=''>
              {filtered.map((items, index) => (
                <div className='relative' key={index}>
                  <SwiperSlide className=' basis-1/5' >
                    <div className='relative h-[280px] border-3 rounded-sm white shadow-lg'>
                      <img
                        src={items.image}
                        alt=''
                        style={{ objectFit: 'fill' }}
                        className='w-full h-[250px] rounded'
                      />
                      <div className=' absolute inset-0 bg-black/30 h-[350px] rounded-xs'>
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
                </div>

              ))
              }
            </div>
          )
          }
        </Swiper>

      </div>
    </div>
  )
}

export default SliderPage
