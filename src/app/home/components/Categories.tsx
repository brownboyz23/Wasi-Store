"use client"
import { Card } from '@/components/ui/card'
import "@/app/globals.css"
import "./css/category.css"
import "./css/banner.css"
import '../../mainCss/main.css'
import C1 from "public/C1.jpg"
import P1 from "public/p (1).jpg"
import P2 from "public/p (15).jpg"
import P3 from "public/p (18).jpg"
import P4 from "public/Storage (3).jpg"
import P5 from "public/p (19).jpg"
import P6 from "public/p (6).jpg"
import P7 from "public/p (7).jpg"
import P8 from "public/p (21).jpg"
import { useRouter } from 'next/navigation'

const CategoriesPage = () => {

  const router = useRouter()

  const handleCardPush = (curEl: string) => {
    if (curEl === "CPU") {
      router.push('/products/cpu/')
    } else if (curEl === "GPU") {
      router.push('/products/gpu/')
    } else if (curEl === "STORAGE") {
      router.push('/products/storage/')
    } else {
      alert('Something Wents to Wrong')
    }
  }


  return (
    <div className='container my-15'>
      <div className='flex justify-center items-center overflow-hidden shadow-none responCt'>
        {[
          { src: P3, label: "RAM" },
          { src: P4, label: "STORAGE" },
          { src: P5, label: "P-SUPPLY" },
          { src: P6, label: "CaSe" },
          { src: P7, label: "S-Card" },
          { src: P8, label: "M-BOARD" },
          { src: C1, label: "CPU" },
          { src: P1, label: "G-MOUSE" },
          { src: P2, label: "GPU" },
        ].map((item, index) => (
          <Card key={index} className='relative ml-8 flex shrink-0 mx-auto py-0 gap-0 h-[70px]  responCtX ' onClick={() => handleCardPush(item.label)}>
            <img
              src={item.src.src}
              alt={item.label}
              style={{ objectFit: "fill" }}
              className='w-[110px] h-[70px]  responCtX '
            />
            <div className=' '>
              <h1 className='text-center text-white responCtXi  langugX2 pt-5'>
                {item.label}
              </h1>
            </div>
          </Card>

        ))}
      </div>
      <h1 className='mt-40  fturProHN text-center'>Products List</h1>
    </div>
  )
}

export default CategoriesPage
