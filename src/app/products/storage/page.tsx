"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "../components/css/banner.css"
import '../../mainCss/mainX.css'
import { FaStar } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import CardsUp from "@/app/mainComp/cardup"
import { useRouter } from "next/navigation"


interface products {
  image: string,
  name: string,
  price: string,
  desc: string,
  category: string,
}


const Storage = () => {


  const [hoverProducts, setHoveredProducts] = useState<products | null>(null)
  const [products, setProduct] = useState<products[]>([])
  const router = useRouter()


  useEffect(() => {
    const getpros = async () => {
      try {
        const getData = await getDocs(collection(db, 'products'))
        const postData = getData.docs.map(doc => ({
          doc: doc.id,

          ...(doc.data() as products)
        }))
        setProduct(postData)
      } catch (error) {
        console.log('here is an erorr', error)
        alert('something wents to wrong')
      }
    }
    getpros()
  })



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


  const filterd = products.filter((CurEl) => {
    return CurEl.category === "Storage"
  })

  return (
    <div className="container mt-10 min-h-screen">
      {products && (
        <div className='w-full CardXrp'>
          {
            filterd.map((items, index) => (
              <Card key={index} className='w-[190px] h-[330px] py-0  border white shadow-lg CardResp' onClick={() => setHoveredProducts(items)}>
                <img
                  src={items.image}
                  alt=''
                  style={{ objectFit: "fill" }}
                  className='w-full h-full'
                />
                <CardHeader className='text-center langugP7 h-[150px] '>
                  <CardTitle className=' line-clamp-1'>
                    <h1 className='mb-2'> {items.name} </h1>
                  </CardTitle>
                  <h1> <span className='text-red-600'>RS</span> : {items.price}  </h1>
                  <CardDescription className='line-clamp-2'>
                    <h1> {items.desc} </h1>
                  </CardDescription>
                </CardHeader>
                <div className='flex justify-center gap-2 '>
                  <FaStar className='text-yellow-500' />
                  <FaStar className='text-yellow-500' />
                  <FaStar className='text-yellow-500' />
                  <FaStar className='text-yellow-500' />
                  <FaStar />
                </div>
                <div className='text-center'>
                  <Button className='w-30 bg-black rounded-sm langugP2 mb-1' onClick={() => handleBuyNow(items)}>Buy Now</Button>
                </div>
              </Card>
            ))
          }
        </div>
      )
      }

      <div className=" relative">
        {hoverProducts && (
          <div className=" inset-0 fixed flex justify-center items-center bg-black/40 z-50  ">
            <CardsUp
              ProCardzs={hoverProducts}
              closeCard={() => setHoveredProducts(null)}
            />
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Storage