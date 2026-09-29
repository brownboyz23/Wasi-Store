'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import './css/products.css'
import { FaStar } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
// import { product } from '@/types'


interface products {
    image: string,
    name: string,
    price: string,
    desc: string,
    category: string,
}

const ProductsSection = () => {

    // const [hoveredProduct, setHoveredProduct] = useState<products | null>(null)
    const [products, setProducts] = useState<products[]>([])
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const dataReciver = onSnapshot(collection(db, 'products'), (snapshot) => {

            const dataQuery = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as products)
            }));
            setProducts(dataQuery)
            setLoading(false)
        }, (error) => {
            console.log('something Wents To Wrong', error)
            setLoading(false)
        })
        return () => dataReciver()
    }, []);


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

    const filtered = products.filter((curEl) => {
        return curEl.category === "HomePro"
    })

    if (loading) return <h1 className='text-center text-2xl mb-30 tracking-wider semibold animate-pulse'>
        <span className=' animate-ping inline-block ml-1'>Loading...</span>
    </h1>

    return (
        <div className='container relative mx-none'>
            <div className='flex justify-center items-center mt-25 '>
                <div className='py-0'>
                    {products && ((
                        <div className=' w-full CardXrp'>
                            {
                                filtered.map((items, index) => (
                                    <Card key={index} className='w-[200px] min-h-[320px] py-0  border white shadow-lg CardResp crdupse'>
                                        <img
                                            src={items.image}
                                            alt='products'
                                            style={{ objectFit: "fill" }}
                                            loading='lazy'
                                            className='w-full  crdimg'
                                        />
                                        <CardHeader className='text-center langugP7 crdHd  h-[150px] '>
                                            <CardTitle className=' line-clamp-1 fontFNM'>
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
                {/* {hoveredProduct && (
                    <div className='absolute z-50 upcrdhnd'>
                        <CardsUp
                            ProCardzs={hoveredProduct}
                            closeCard={() => setHoveredProduct(null)}
                        />
                    </div>
                )
                } */}
            </div>
            <div className='flex items-center justify-center mt-30'>
                <h1 className='fturProHN mb-20'>
                    Featured
                </h1>
            </div>
        </div>
    )
}

export default ProductsSection