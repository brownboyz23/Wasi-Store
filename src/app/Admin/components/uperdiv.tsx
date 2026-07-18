"use client"
import React, { useEffect, useState } from 'react'
import './css/admin.css'
import '../../mainCss/mainXadmin.css'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FaEye, FaPencil, FaStar } from 'react-icons/fa6'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import AdminChart from './tradeChart'
import CardsUp from '@/app/mainComp/cardup'
import EditModal from '../modal/page'


interface products {
    image: string,
    name: string,
    price: string,
    desc: string,
    category: string
    id?: string,
}



const ThreeMainsDiv = () => {

    ///for hovermotion
    const [hoverproducts, sethoverProducts] = useState<products | null>(null)
    /// for single card
    const [mainproducts, setMainProducts] = useState<products | null>(null)

    const [products, setproducts] = useState<products[]>([])
    const [iseditopen, setisEditOpen] = useState(false)




    useEffect(() => {
        const dataRecive = async () => {
            try {
                const dataContent = await getDocs(collection(db, "products"))
                const data = dataContent.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as products)
                }))
                setproducts(data)
            } catch (erorr) {
                console.log("in document somewhere an error found", erorr)
                alert("something wents to wrong")
            }
        }
        dataRecive();
    }, [])

    const DelHandle = async (productsId: string) => {
        const DelFirm = window.confirm("Are You Sure , about Delete This Product")

        if (DelFirm) {
            try {
                const productsRef = doc(db, "products", productsId)

                await deleteDoc(productsRef)

                setproducts((prevproducts) => prevproducts.filter(item => item.id !== productsId))
            } catch (error) {
                console.log('there is an Eorrr', error)
                alert("Something Wents To Wrong")
            }
        }
    }


    return (
        <div>
            <div className=''>
                <h1 className='font4 text-center mt-20 text-4xl fontB500'>Wellcome To Admin Panel</h1>
                <div className='w-full'>
                    <div className='flex justify-around mb-30 mt-30  dshbpxFxk'>
                        <div className='w-[520px]'>
                            <div className='flex flex-col justify-start'>
                                <AdminChart />
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex justify-center items-center ms-auto'>
                                <h1 className='text-2xl mb-5 text-center'>Added Products</h1>
                            </div>
                            <div className='dshbpxFx'>
                                <div className=' border rounded-lg  p-4 h-80 w-[520px]  hover:shadow-md overflow-hidden overflow-y-scroll   dshbpxF'>
                                    <div className='flex flex-col gap-1 '>
                                        {products.map((items, index) => (
                                            <Card key={index} className='flex justify-between flex-row w-[full h-[67px] gap-0 p-0 px-1 w-fixed break-words dshbpxx'>
                                                <img src={items.image} alt="" className='fill w-[80px] h-[60px] dshbpIm' />
                                                <div className='flex justify-between  items-center w-full h-[60px] dshbsx'>
                                                    <CardHeader>
                                                        <CardTitle className='flex justify-between w-[105px] me-10 dshbpHD'>
                                                            <h5 className='line-clamp-1'>{items.name}</h5>
                                                            <h6 className='price dshbpx'>{items.price}</h6>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <CardDescription className='w-[90px] ms-20 dshbpNM'>
                                                            <p className='text-gray line-clamp-2'>{items.desc}</p>
                                                        </CardDescription>
                                                    </CardFooter>
                                                    <div className='flex flex-col gap-1 mt-2 dbpxs'>
                                                        <Button className='text-red-600 w-[20px] h-[15px] bg-transparent hover:ring-2 hover:ring-gray-300 hover:bg-0 '><span className='font-bold text-2xl text-center' onClick={() => DelHandle(items.id!)}>-</span></Button>
                                                        {/* <Link className='' href={'/Admin/modal/'}> */}
                                                        <Button className='text-red-600 w-[20px] h-[15px] bg-transparent hover:ring-2 hover:ring-gray-300 hover:bg-0 ' onClick={() => {
                                                            setMainProducts(items)
                                                            setisEditOpen(true)
                                                        }}><span className='font-bold text-2xl text-center'  >
                                                                <FaPencil />
                                                            </span> </Button>
                                                        {/* </Link> */}
                                                        <Button className='text-red-600 w-[20px] h-[15px] bg-transparent hover:ring-2 hover:ring-gray-300 hover:bg-0 '><span className='font-bold text-2xl text-center' onClick={() => sethoverProducts(items)}><FaEye /></span></Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                        }
                                    </div>
                                    <div>
                                        {mainproducts && (
                                            <div className='w-full h-full'>
                                                <EditModal
                                                    isEdit={iseditopen}
                                                    hoverPro={mainproducts}
                                                    setEdit={(value) => {
                                                        setisEditOpen(value)
                                                        if (!value) return setMainProducts(null)
                                                    }}
                                                    setHover={setproducts}
                                                />
                                            </div>
                                        )
                                        }
                                    </div>
                                    <div>
                                        {hoverproducts && (
                                            <div className='absolute inset-0 fixed flex justify-center items-center bg-black/40 z-50'>
                                                <CardsUp
                                                    ProCardzs={hoverproducts}
                                                    closeCard={() => sethoverProducts(null)}
                                                />
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>

        </div >

    )
}

export default ThreeMainsDiv