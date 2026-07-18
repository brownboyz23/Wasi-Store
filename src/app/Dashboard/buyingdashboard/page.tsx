"use client"
import CardsUp from '@/app/mainComp/cardup'
import { db } from '@/lib/firebase'
import { faEye, faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'


interface products {
    image: string,
    name: string,
    price: string,
    desc: string,
    id?: string,
    category: string
}

const BuyingDashBoard = () => {

    const [hoveredProduct, setHoveredProduct] = useState<products | null>(null)
    const [firebase, setFireBase] = useState<products[]>([])


    useEffect(() => {
        const handleBuyNow = async () => {
            try {
                const queryContent = await getDocs(collection(db, "orders"))
                const data = queryContent.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as products)
                }))
                setFireBase(data)

            } catch (error) {
                console.error('There is an Error', error)
                alert('Something Wents to Wrong')
            }

        }
        handleBuyNow()
    }, [])

    const HandleDelete = async (DocId: string) => {

        try {
            await deleteDoc(doc(db, "orders", DocId))

            setFireBase((prevItems) => prevItems.filter((items) => items.id !== DocId))
        } catch (error) {
            console.log('There is an Error', error)
            alert('Something  Wents To Wrong')
        }
    }


    return (
        <div className='container'>
            <div className='w-full h-screen p-10'>
                <div className='border w-[full] h-[700px]  mt-30 p-10 rounded-sm overflow-y-auto bg-white shadow-lg'>
                    <h1 className='text-5xl text-center my-5 langugP8 text-red-700 font-bold mb-20'>DashBoard</h1>
                    {firebase.length === 0 ? (
                        <div className="text-center text-gray-500 text-2xl mt-20">No items purchased yet.</div>
                    ) : (
                        <div className='flex flex-col gap-4 w-full h-[500px] overflow-y-scroll'>
                            <div className="flex flex-col gap-4 w-full h-[600px] overflow-y-auto p-4">
                                {firebase.map((items, index) => (
                                    <div key={items.id || index}
                                        className="w-[1000px] h-[120px] flex justify-around items-center border rounded-md bg-white hover:shadow-md transition-shadow shrink-0"
                                    >
                                        {/* Image */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={items.image} /// nhi aa raha aa
                                                alt={''}
                                                width={100}
                                                height={95}
                                                className="w-[100px] h-[95px] border object-contain"
                                            />
                                        </div>

                                        {/* Name */}
                                        <div className="w-[150px]">
                                            <h1 className="text-xl font-bold line-clamp-1">
                                                {items.name}
                                            </h1>
                                        </div>

                                        {/* Description */}
                                        <div className="w-[350px]">
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {items.desc}
                                            </p>
                                        </div>

                                        {/* Quantity Section */}
                                        <div className="w-[180px] flex gap-2 justify-center items-center">
                                            <button className="cursor-pointer text-gray-600 hover:text-red-500">
                                                <FontAwesomeIcon icon={faMinusCircle} />
                                            </button>
                                            <span className="border w-[40px] text-center rounded bg-gray-50">1</span>
                                            <button className="cursor-pointer text-gray-600 hover:text-green-500">
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="w-[100px] font-bold text-red-600 text-lg">
                                            RS: {items.price}
                                        </div>

                                        {/* Action Icons */}
                                        <div className="flex flex-col gap-5">
                                            <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer hover:scale-110" title="View" onClick={() => setHoveredProduct(items)} />
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer hover:scale-110" title="Delete" onClick={() => {
                                                HandleDelete(items.id!)
                                            }} />
                                        </div>
                                    </div>
                                ))

                                }
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
            <div>
                {hoveredProduct && (
                    <div className='absolute  inset-0 fixed flex justify-center items-center bg-black/40  z-50'>
                        <CardsUp
                            ProCardzs={hoveredProduct}
                            closeCard={() => setHoveredProduct(null)}
                        />
                    </div>
                )

                }
            </div>
        </div>
    )
}

export default BuyingDashBoard