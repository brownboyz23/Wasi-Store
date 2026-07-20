"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaStar } from 'react-icons/fa6'
import "../components/css/banner.css"
import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import CardsUp from '@/app/mainComp/cardup'
import { useRouter } from 'next/navigation'


interface products {
  image: string,
  name: string,
  price: string,
  desc: string,
  category: string,
}



const GPUSection = () => {



  const [hoverProducts, setHoveredProducts] = useState<products | null>(null)
  const [products, setProducts] = useState<products[]>([])
  const router = useRouter()

  useEffect(() => {

    const getproDucts = async () => {
      try {
        const getData = await getDocs(collection(db, 'products'))
        const DataPost = getData.docs.map(doc => ({
          id: doc.id,

          ...(doc.data() as products)
        }))
        setProducts(DataPost)

      } catch (error) {
        alert(`something wents to wrong,${error}`)
      }

    }
    getproDucts()
  }, [])

  const handleBuyNow = async (items: products) => {
    try {
      await addDoc(collection(db, 'orders'), {
        image: items.image,
        name: items.name,
        price: items.price,
        desc: items.desc,
        createdAt: new Date(),
        status: "pending",
      })
      router.push('/Dashboard/buyingdashboard/')
    } catch (error) {
      console.log('there is an error', error)
      alert("Something Wents to Wrong")

    }
  }

  const filterd = products.filter((curEl) => {
    return curEl.category === "GPU"
  })



  return (
    <div className='container relative mx-none'>
      <div className='flex  justify-center items-center mt-25 overflow-hidden'>
        <div className='py-0'>
          {products && ((
            <div className='w-full min-h-screen CardXrp '>
              {
                filterd.map((items, index) => (
                  <Card key={index} className='w-[200px] min-h-full py-0  border white shadow-lg CardResp' onClick={() => setHoveredProducts(items)}>
                    <img
                      src={items.image}
                      alt=''
                      style={{ objectFit: "fill" }}
                      className='w-full  crdimg'
                    />
                    <CardHeader className='text-center langugP7   h-[150px] '>
                      <CardTitle className=' line-clamp-1 fontsgs'>
                        <h1 className=''> {items.name} </h1>
                      </CardTitle>
                      <h1 className='mt-1 fontPric'> <span className='text-red-600'>RS</span> : {items.price}  </h1>
                      <CardDescription className='line-clamp-2  fontDesc'>
                        <h1 > {items.desc} </h1>
                      </CardDescription>
                    </CardHeader>
                    <div className='flex justify-center gap-2 crdstr '>
                      <FaStar className='text-yellow-500' />
                      <FaStar className='text-yellow-500' />
                      <FaStar className='text-yellow-500' />
                      <FaStar className='text-yellow-500' />
                      <FaStar />
                    </div>
                    <div className='text-center' >
                      <Button className='w-30 bg-black rounded-sm langugP2 mb-1 ctgbtn' onClick={() => handleBuyNow(items)}>Buy Now</Button>
                    </div>
                  </Card>
                ))
              }
            </div>
          ))

          }
        </div>
        <div>
          {hoverProducts && (
            <div className="absolute inset-0 fixed flex justify-center items-center  bg-black/40 z-50 ">

              <CardsUp
                ProCardzs={hoverProducts}

                closeCard={() => setHoveredProducts(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GPUSection