"use client"
import { Button } from '@/components/ui/button'
import { useContext, useEffect, useState } from 'react'
import "./css/banner.css"
import '../../mainCss/manXC.css'
import { EyeIcon } from 'lucide-react'
import PayForm from './payForm'
import { motion } from "framer-motion"
import { BuilderContext, BuilderContextType } from '@/app/Dashboard/components/buildcontext'



export type components = {
  name: string,
  type: string,
  image: string,
  id?: string | number;
  price: number
  des: string,
}

type componentsProp = {
  onDelete: (typeIsOver: string) => void;
  display: (categoryName: string) => void;
}




const Selectionmin = ({ onDelete, display }: componentsProp) => {

  // const [logfirst, setLogFirst] = useState("log")

  const { loggedin, setIsOpen, setActiveform } = useContext(BuilderContext) as BuilderContextType

  const [showall, setShowall] = useState(false)

  const [showpay, setShowpay] = useState(false)

  const [selectitem, setSelectItem] = useState("payement")


  useEffect(() => {
    const haspendingorder = localStorage.getItem('PendingOrders');

    if (loggedin && haspendingorder) {
      setTimeout(() => {
        setShowpay(true);
        setSelectItem('payment')

      })
    }
  }, [loggedin])


  const context = useContext(BuilderContext)
  const selectcom = context?.selectp || []

  const rightToleft = {
    hidden: { opacity: 0.4, x: -600 },
    show: { opacity: 1, x: 0, transition: { duration: 1.2 } }
  }



  const actvlyItem = selectcom.length > 0
    ? selectcom[selectcom.length - 1] :

    {
      image: "/default.png",
      name: "Build Your Pc",
      type: "default",
      id: "defualt-id"
    }

  if (selectcom.length === 0) return null;


  return (
    <div>
      <div className='container '>
        <div className=' mt-12  bg-[#0a0a1a] rounded custodev  '>
          <div className='flex justify-end mb-2'>
            <Button onClick={() => {
              setShowall(!showall)
            }}>
              <EyeIcon className='bg-transparent' />
            </Button>
          </div>
          <div className='flex flex-col  rounded'>
            <div className='w-full h-full flex justify-center items-center'>
              {!showall ? (
                <img
                  src={actvlyItem.image}
                  alt={actvlyItem.name}
                  style={{ objectFit: "fill" }}
                  className="object-fill  p-10 custodevIm "
                />

              ) : (
                <div className='flex gap-2  overflow-x-auto px-2'>
                  {selectcom.map((item) => (
                    <div key={item.id} className='relative min-w-[360px]'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='object-fill w-[300px] h-[300px] text-white custodevIm'
                      />
                      <Button onClick={() => onDelete(item.type)} className='absolute -top-1 -right-1 bg-black text-white text-xl rounded'>
                        -
                      </Button>
                    </div>
                  ))
                  }
                </div>
              )
              }

            </div>
            <div className='flex flex-col  items-center w-full justify-center custodevC'>
              {selectcom.length > 0 && (
                <div className='w-[360px] absolute h-[60px] mb-10 mt-10 text-white text-center transition-all duration-300 animate-pulse custodevMai'>
                  <h1
                    className='text-3xl font-bold text-white custodevHd'
                    onClick={() => display(selectcom[selectcom.length - 1].name)}
                  >
                    <span className='text-gray-400'> RS : </span>
                    {selectcom[selectcom.length - 1].price}
                  </h1>
                  <p className='  text-md '>
                    Item: {selectcom[selectcom.length - 1].name}
                  </p>
                </div>
              )}

              <div className='w-full flex justify-around items-center w-full h-[30] mt-15 relative '>

                <div className='flex'>
                  <button className='bg-slate-900  px-3 mt-10 rounded text-white font-bold ctgbtnSp'>
                    <span className='text-red-500'>T:</span>{selectcom.reduce((acc, curr) => acc + Number(curr.price || 0), 0)}
                  </button>
                </div>
                <div >
                  <Button onClick={() => {
                    localStorage.setItem("PendingOrders", JSON.stringify(selectcom))
                    {
                      if (!loggedin) {
                        setActiveform("login")
                        setIsOpen(true)
                      }
                      else {
                        setSelectItem("pyment")
                        setShowpay(true)
                      }
                    }


                  }} className='w-30 h-[30px] mt-10 bg-red-600 text-1xl hover:bg-sky-500 ctgbtnSp' id='collapes'>
                    Buy Now
                  </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
        {(showpay && selectitem === "pyment") && (
          <div className="fixed inset-0 z-[999]">
            <div onClick={() => setShowpay(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md " />
            <motion.div
              variants={rightToleft}
              initial="hidden"
              animate="show"
              className='w-full h-full relative pointer-events-none flex justify-center items-center'
            >
              <div className='pointer-events-auto z-50'
              >
                {/* <h3>Total Bill : {paytype}</h3> */}
                <PayForm onSuccess={() => setShowpay(false)}
                  setShowpay={setShowpay}
                />
              </div>
            </motion.div>
          </div>
        )
        }
      </div>
    </div >
  )
}

export default Selectionmin