"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import "../components/css/banner.css"
import '../../mainCss/mainX.css'
import { FaStar } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
// import { product } from '@/types';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CardsUp from '@/app/mainComp/cardup';
import { useRouter } from 'next/navigation';



interface products {
  image: string,
  name: string,
  desc: string,
  price: string,
  category: string,
}



const CPUSection = () => {

  const [hoveredProduct, setHoveredProduct] = useState<products | null>(null)
  const [product, setProducts] = useState<products[]>([])
  const router = useRouter()

  useEffect(() => {
    const dataRecv = async () => {
      try {
        const dataget = await getDocs(collection(db, 'products'))
        const dataP = dataget.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as products)
        }))
        setProducts(dataP)
        // setLoading(true)
      } catch (erorr) {
        console.log('in this function has erorr', erorr)
        alert('somethings wents to wrong')
      }
      // setLoading(false)
    }
    dataRecv()
  }, [])

  const handleBuyNow = async (itemsId: products) => {
    try {
      await addDoc(collection(db, "orders",), {
        image: itemsId.image,
        name: itemsId.name,
        price: itemsId.price,
        desc: itemsId.desc,
        createdAt: new Date(),
        status: "pending",
      })
      router.push('/Dashboard/buyingdashboard/')
    } catch (error) {
      console.log('there is an error', error)
      alert("Something Wents to Wrong")
    }
  }

  const filterd = product.filter((curEl) => {
    return curEl.category === "CPU"
  })


  return (

    <div className='container relative mx-none min-h-screen'>
      <div className='flex  justify-center items-center mt-25 '>
        <div className='py-0  '>
          {product && ((
            <div className='w-full CardXrp'>
              {
                filterd.map((items, index) => (
                  <Card key={index} className='w-[200px] min-h-[320px] py-0  border white shadow-lg CardResp' onClick={() => setHoveredProduct(items)}>
                    <img
                      src={items.image}
                      alt=''
                      style={{ objectFit: "fill" }}
                      className='w-full  crdimg'
                    />
                    <CardHeader className='text-center langugP7  crdHd h-[150px] '>
                      <CardTitle className=' line-clamp-1 fontsgs'>
                        <h1 className=''> {items.name} </h1>
                      </CardTitle>
                      <h1 className='mt-1 fontPric'> <span className='text-red-600'>RS</span> : {items.price}  </h1>
                      <CardDescription className='line-clamp-2  fontDesc'>
                        <h1 > {items.desc} </h1>
                      </CardDescription>
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
                    </CardHeader>
                  </Card>
                ))
              }
            </div>
          ))

          }
        </div>
        <div>
          {hoveredProduct && (
            <div className="absolute inset-0 fixed flex justify-center items-center  bg-black/40 z-50 ">

              <CardsUp
                ProCardzs={hoveredProduct}

                closeCard={() => setHoveredProduct(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CPUSection